import { StageInstance } from "discord.js";
import { Events } from "../Events.js";
import { StageEvent } from "./StageEvent.js";


export class StageInstanceDeleteEvent extends StageEvent {

    /**
     * @param {StageInstance} stageInstance 
     */
    constructor(stageInstance) {
        super(Events.StageInstanceDelete, stageInstance);
    }
}