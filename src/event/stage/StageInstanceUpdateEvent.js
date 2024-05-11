import { StageInstance } from "discord.js";
import { Events } from "../Events.js";
import { StageEvent } from "./StageEvent.js";


export class StageInstanceUpdateEvent extends StageEvent {

    oldStageInstance;

    /**
     * @param {StageInstance} oldStageInstance 
     * @param {StageInstance} newStageInstance 
     */
    constructor(oldStageInstance, newStageInstance) {
        super(Events.StageInstanceUpdate, newStageInstance);
        this.oldStageInstance = oldStageInstance;
    }

    /**
     * @returns {StageInstance}
     */
    getOldStageInstance() {
        return this.oldStageInstance
    }
}