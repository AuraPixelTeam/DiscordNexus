import { DiscordNexus } from "../DiscordNexus.js";
import { TaskScheduler } from "../scheduler/TaskScheduler.js";
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
    taskScheduler;

    constructor(nexus, description, file) {
        this.nexus = nexus;
        this.description = new PluginDescription(description);
        this.file = file;
        this.taskScheduler = new TaskScheduler(this);
    }

    /**
     * @returns {DiscordNexus}
     */
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
        const configYml = `${this.getDataPath()}/config.yml`;
        if (!existsSync(configYml)) {
            this.saveResource("config.yml");
        }
    }

    saveResource(fileName) {
        const resourcePath = `${this.file}/resources/${fileName}`;
        let content = '';
        if (existsSync(resourcePath)) {
            content = readFileSync(`${resourcePath}`, 'utf-8');
        }
        writeFileSync(`${this.getDataPath()}/${fileName}`, content)
    }

    /**
     * @returns {TaskScheduler}
     */
    getScheduler() {
        return this.taskScheduler;
    }

    onLoad() {}

    onEnable() {}

    onDisable() {}
}