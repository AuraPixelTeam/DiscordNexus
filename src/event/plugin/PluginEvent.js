import { Event } from "../Event.js";

export class PluginEvent extends Event {

    plugin;
    constructor(eventName, plugin) {
        super(eventName);
        this.plugin = plugin;
    }
    
    getPlugin() {
        return this.plugin;
    }
}