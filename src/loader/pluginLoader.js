import {
    existsSync,
    mkdirSync
} from "fs";
import { LocalData, LocalDataTypes } from "../utils/LocalData.js";
import { VersionInfo } from "../VersionInfo.js";
import { PluginBase } from "../plugin/PluginBase.js";
import { Translatable } from "../lang/Translatable.js";
import { TranslationKeys } from "../lang/TranslationKeys.js";
import { DiscordNexus } from "../DiscordNexus.js";

export class pluginLoader {

    instance;
    nexus;
    file;

    /**
     * 
     * @param {DiscordNexus} nexus 
     * @param {string} file 
     */
    constructor(nexus, file) {
        this.nexus = nexus;
        this.file = file;
    }

    async load() {
        const language = this.nexus.getLanguage();
        const pluginYml = this.file + "/nexus-plugin.yml";
        if (!existsSync(pluginYml)) {
            return;
        }

        const localData = new LocalData(pluginYml, LocalDataTypes.YAML);
        const pluginInfo = localData.getAll();
        const requiredInfo = ["name", "api", "version", "main", "author"];

        for (let type of requiredInfo) {
            if (!pluginInfo[type]) {
                throw new Error(language.translate(new Translatable(TranslationKeys.NEXUS_PLUGIN_INFO_NOT_EXISTS, [type, pluginYml])));
            }
        }

        switch(typeof pluginInfo["api"]) {
            case 'string':
                if (pluginInfo["api"] !== VersionInfo.VERSION) {
                    throw new Error(language.translate(new Translatable(TranslationKeys.NEXUS_PLUGIN_API_ERROR, [pluginInfo["name"], VersionInfo.VERSION])));
                }
                break;
            case 'object':
                if (!pluginInfo["api"].includes(VersionInfo.VERSION)) {
                    throw new Error(language.translate(new Translatable(TranslationKeys.NEXUS_PLUGIN_API_ERROR, [pluginInfo["name"], VersionInfo.VERSION])));
                }
                break;
        }
        

        const mainPath = `${this.file}/src/${pluginInfo["main"]}.js`;
        // TODO: clean path
        try {
            const module = await import(`./../../${this.file}/src/${pluginInfo["main"]}.js`);
            let mainClassName = pluginInfo["main"].split("/");
            mainClassName = mainClassName[mainClassName.length - 1];
            const mainClass = new (module[mainClassName])(this.nexus, pluginInfo, this.file);

            if (mainClass instanceof PluginBase) {
                this.instance = mainClass;
            } else {
                throw new Error(language.translate(new Translatable(TranslationKeys.NEXUS_PLUGIN_MAIN_NOT_EXISTS, [pluginInfo["name"]])));
            }
        } catch (error) {
            throw new Error(error);
        }
        if (!existsSync(mainPath)) {
            throw new Error(language.translate(new Translatable(TranslationKeys.NEXUS_PLUGIN_MAIN_NOT_EXISTS, [pluginInfo["name"]])));
        }
        this.nexus.getBaseConsole().info(language.translate(new Translatable(TranslationKeys.NEXUS_LOADING_PLUGIN, [pluginInfo["name"], pluginInfo["version"]])));

        const pluginData = `plugin_data/${pluginInfo["name"]}`;
        if (!existsSync(pluginData)) {
            mkdirSync(pluginData);
        }
        this.instance.onLoad();
    }

    getPlugin() {
        return this.instance;
    }
}