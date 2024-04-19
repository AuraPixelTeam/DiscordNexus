import {
    existsSync
} from "fs";
import { LocalData, LocalDataTypes } from "../utils/LocalData.js";
import { VersionInfo } from "../VersionInfo.js";
import { PluginBase } from "../plugin/PluginBase.js";

export class pluginLoader {

    instance;
    nexus;
    file;

    constructor(nexus, file) {
        this.nexus = nexus;
        this.file = file;
    }

    async load() {
        const pluginYml = this.file + "/nexus-plugin.yml";
        if (!existsSync(pluginYml)) {
            return;
        }

        const localData = new LocalData(pluginYml, LocalDataTypes.YAML);
        const pluginInfo = localData.getAll();
        const requiredInfo = ["name", "api", "version", "main", "author"];

        for (let type of requiredInfo) {
            if (!pluginInfo[type]) {
                throw new Error(`Thông tin "${type}" không tồn tại trong ${pluginYml}`);
            }
        }

        if (pluginInfo["api"] !== VersionInfo.VERSION) {
            throw new Error(`Plugin ${pluginInfo["name"]} không thể chạy với Nexus ${VersionInfo.VERSION}`);
        }

        const mainPath = `${this.file}/src/${pluginInfo["main"]}.js`;
        // TODO: clean path
        try {
            const module = await import(`./../../${this.file}/src/${pluginInfo["main"]}.js`);
            let mainClassName = pluginInfo["main"].split("/");
            mainClassName = mainClassName[mainClassName.length - 1];
            const mainClass = new (module[mainClassName])(this.nexus, pluginInfo);
            
            if (mainClass instanceof PluginBase) {
                this.instance = mainClass;
            } else {
                throw new Error(`Không thể tìm thấy mục chính của plugin ${pluginInfo["name"]}`);
            }
        } catch (error) {
            throw new Error(error);
        }
        if (!existsSync(mainPath)) {
            throw new Error(`Không thể tìm thấy mục chính của plugin ${pluginInfo["name"]}`);
        }
        this.nexus.getBaseConsole().info(`Đang tải ${pluginInfo["name"]} v${pluginInfo["version"]}`);
        this.instance.onLoad();
    }

    getPlugin() {
        return this.instance;
    }
}