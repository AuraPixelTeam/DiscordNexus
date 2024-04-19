import { PluginBase } from "../../../../../src/plugin/PluginBase.js";

export class Example extends PluginBase {

    onLoad() {
        console.log("Plugin example loaded");
        
    }
}