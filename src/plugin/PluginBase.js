import { LocalData, LocalDataTypes } from "../utils/LocalData.js";
import { PluginDescription } from "./PluginDescription.js";
import {
    existsSync,
    readFileSync,
    writeFileSync
} from "fs";

export class PluginBase {

    nexus;
    description;
    file;

    constructor(nexus, description, file) {
        this.nexus = nexus;
        this.description = new PluginDescription(description);
        this.file = file;
    }

    getNexus() {
        return this.nexus;
    }

    getDescription() {
        return this.description;
    }
    
    getDataPath() {
        return `plugin_data/${this.getDescription().getName()}`;
    }

    getConfig() {
        return new LocalData(`${this.getDataPath()}/config.yml`, LocalDataTypes.YAML);
    }

    saveDefaultConfig() {
        this.saveResource("config.yml");
    }

    saveResource(fileName) {
        const resourcePath = `${this.file}/resources/${fileName}`;
        let content = '';
        if (existsSync(resourcePath)) {
            content = readFileSync(`${resourcePath}`, 'utf-8');
        }
        writeFileSync(`${this.getDataPath()}/${fileName}`, content)
    }

    onLoad() {}

    onEnable() {}

    onDisable() {}
}