import { ThreadChannel } from "discord.js";
import { Events } from "../Events.js";


export class ThreadEvent extends Events {

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