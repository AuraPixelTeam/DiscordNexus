import { Events } from "../Events.js";
import { ModerationEvent } from "./ModerationEvent.js";


export class AutoModerationRuleUpdateEvent extends ModerationEvent {

    oldAutoModerationRule;

    /**
     * @param {AutoModerationRule} oldAutoModerationRule 
     * @param {AutoModerationRule} newAutoModerationRule 
     */
    constructor(oldAutoModerationRule, newAutoModerationRule) {
        super(Events.AutoModerationRuleUpdate, newAutoModerationRule);
        this.oldAutoModerationRule = oldAutoModerationRule;
    }

    getOldAutoModerationRule() {
        return this.oldAutoModerationRule;
    }
}