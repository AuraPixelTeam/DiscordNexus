import { PluginBase } from "../../../../../src/plugin/PluginBase.js";
import { ExtraChannel } from "../../../../../src/utils/ExtraChannel.js";
import { TestCommand } from "./command/TestCommand.js";

export class Example extends PluginBase {

    onLoad() {
        console.log("Plugin example loaded");
    }

    onEnable() {
        this.saveDefaultConfig();
        this.getNexus().getCommandMap().register(new TestCommand());
    }

    onDisable() {
        console.log("shutdown");
    }

    async test() {
    }
}