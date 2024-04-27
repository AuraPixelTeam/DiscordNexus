import { Listener } from "../../../../../src/event/Listener.js";
import { PluginEnableEvent } from "../../../../../src/event/plugin/PluginEnableEvent.js";

export class EventListener extends Listener {
    /**
     * @param {PluginEnableEvent} event
     */
    pluginDisable(event) {
        const plugin = event.getPlugin();
    }
}
