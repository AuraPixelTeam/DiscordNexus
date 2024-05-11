import { AutoModerationRule } from "discord.js";
import { Events } from "../Events.js";
import { ModerationEvent } from "./ModerationEvent.js";


export class AutoModerationRuleDeleteEvent extends ModerationEvent {

    /**
     * @param {AutoModerationRule} autoModerationRule 
     */
    constructor(autoModerationRule) {
        super(Events.AutoModerationRuleDelete, autoModerationRule);
    }
}