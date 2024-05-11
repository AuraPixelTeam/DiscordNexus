import { AutoModerationRule } from "discord.js";
import { Event } from "../Event.js";


export class ModerationEvent extends Event {

    autoModerationRule;

    /**
     * @param {string} eventName 
     * @param {AutoModerationRule} autoModerationRule 
     */
    constructor(eventName, autoModerationRule) {
        super(eventName);
        this.autoModerationRule = autoModerationRule;
    }

    /**
     * @returns {AutoModerationRule}
     */
    getAutoModerationRule() {
        return this.autoModerationRule;
    }
}