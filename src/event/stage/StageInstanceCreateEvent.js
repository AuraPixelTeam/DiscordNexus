import { Events } from "../Events.js";
import { StageEvent } from "./StageEvent.js";


export class StageInstanceCreateEvent extends StageEvent {

    constructor(stageInstance) {
        super(Events.StageInstanceCreate, stageInstance);
    }
}