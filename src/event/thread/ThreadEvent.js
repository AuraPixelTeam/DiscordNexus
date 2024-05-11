import { ThreadChannel } from "discord.js";
import { Event } from "../Event.js";


export class ThreadEvent extends Event {

    thread;

    /**
     * 
     * @param {string} eventName 
     * @param {ThreadChannel} thread 
     */
    constructor(eventName, thread) {
        super(eventName);
        this.thread = thread;
    }

    /**
     * @returns {ThreadChannel}
     */
    getThread() {
        return this.thread;
    }
}