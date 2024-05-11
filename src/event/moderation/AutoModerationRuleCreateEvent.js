import { Events } from "../Events.js";
import { ModerationEvent } from "./ModerationEvent.js";


export class AutoModerationRuleCreateEvent extends ModerationEvent {

    /**
     * @param {AutoModerationRule} autoModerationRule 
     */
    constructor(autoModerationRule) {
        super(Events.AutoModerationRuleCreate, autoModerationRule);
    }
}