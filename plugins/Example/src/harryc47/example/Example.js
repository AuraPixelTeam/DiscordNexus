import { PluginBase } from "../../../../../src/plugin/PluginBase.js";
import { ExtraChannel } from "../../../../../src/utils/ExtraChannel.js";

export class Example extends PluginBase {

    onLoad() {
        console.log("Plugin example loaded");
    }

    onEnable() {
        this.saveDefaultConfig();
        this.test()
    }

    onDisable() {
        console.log("shutdown");
    }

    async test() {
    }
}