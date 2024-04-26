import { Event } from "../Event.js";
import { Events } from "../Events.js";

export class PluginEnableEvent extends Event {

    plugin;
    constructor(plugin) {
        super(Events.PLUGIN_ENABLE_EVENT);
        this.plugin = plugin;
    }
    
    getPlugin() {
        return this.plugin;
    }
}