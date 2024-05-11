import { StageInstance } from "discord.js";
import { Event } from "../Event.js";


export class StageEvent extends Event {

    stageInstance;

    /**
     * @param {string} eventName 
     * @param {StageInstance} stageInstance 
     */
    constructor(eventName, stageInstance) {
        super(eventName);
        this.stageInstance = stageInstance;
    }

    /**
     * @returns {StageInstance}
     */
    getStageInstance() {
        return this.stageInstance;
    }
}