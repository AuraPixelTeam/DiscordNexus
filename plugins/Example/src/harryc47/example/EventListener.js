import { Listener } from "../../../../../src/events/Listener.js";
import { PluginEnableEvent } from "../../../../../src/events/plugin/PluginEnableEvent.js";

export class EventListener extends Listener {

    /**
     * @param {PluginEnableEvent} event 
     */
    PluginEnableEvent(event) {
        const plugin = event.getPlugin();
    }
}