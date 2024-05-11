import { ThreadChannel } from "discord.js";
import { Events } from "../Events.js";
import { ThreadEvent } from "./ThreadEvent.js";


export class ThreadDeleteEvent extends ThreadEvent {

    /**
     * 
     * @param {ThreadChannel} thread 
     */
    constructor(thread) {
        super(Events.ThreadDelete, thread);
    }
}