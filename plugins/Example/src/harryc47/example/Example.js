import { PluginBase } from "../../../../../src/plugin/PluginBase.js";

export class Example extends PluginBase {

    onLoad() {
        console.log("Plugin example loaded");
    }

    onEnable() {
        this.saveDefaultConfig();
        console.log(this.getConfig().get("yes"))
    }
}