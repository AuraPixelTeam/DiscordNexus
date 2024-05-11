import { ThreadChannel } from "discord.js";
import { Events } from "../Events.js";
import { ThreadEvent } from "./ThreadEvent.js";


export class ThreadCreateEvent extends ThreadEvent {

    newlyCreated;

    /**
     * 
     * @param {ThreadChannel} thread 
     * @param {boolean} newlyCreated 
     */
    constructor(thread, newlyCreated) {
        super(Events.ThreadCreate, thread);
        this.newlyCreated = newlyCreated;
    }

    /**
     * @returns {boolean}
     */
    getNewlyCreated() {
        return this.newlyCreated;
    }
}