import { Events } from "../Events.js";
import { PluginEvent } from "./PluginEvent.js";

export class PluginDisableEvent extends PluginEvent {

    constructor(plugin) {
        super(Events.PLUGIN_DISABLE_EVENT, plugin);
    }
}