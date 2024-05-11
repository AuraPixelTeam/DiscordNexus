import { Events } from "../Events.js";
import { PluginEvent } from "./PluginEvent.js";

export class PluginEnableEvent extends PluginEvent {

    constructor(plugin) {
        super(Events.PluginEnable, plugin);
    }
}