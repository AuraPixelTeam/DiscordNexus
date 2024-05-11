import { Events } from "../Events.js";
import { ModerationEvent } from "./ModerationEvent.js";


export class AutoModerationActionExecutionEvent extends ModerationEvent {

    autoModerationActionExecution;

    constructor(autoModerationActionExecution) {
        super(Events.AutoModerationActionExecution, null);
        this.autoModerationActionExecution = autoModerationActionExecution;
    }

    getAutoModerationActionExecution() {
        return this.autoModerationActionExecution;
    }
}