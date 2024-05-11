import { Collection, Guild } from "discord.js";
import { Events } from "../Events.js";
import { ThreadEvent } from "./ThreadEvent.js";


export class ThreadListSyncEvent extends ThreadEvent {

    threads;
    guild;

    /**
     * @param {Collection} threads 
     * @param {Guild} guild 
     */
    constructor(threads, guild) {
        super(Events.ThreadListSync, null);
        this.threads = threads;
        this.guild = guild;
    }

    /**
     * @returns {Collection}
     */
    getThreads() {
        return this.threads;
    }

    /**
     * @returns {Guild}
     */
    getGuild() {
        return this.guild;
    }
}