import { Presence } from "discord.js";
import { Event } from "../Event.js";
import { Events } from "../Events.js";


export class PresenceUpdateEvent extends Event {

    oldPresence;
    newPresence;

    /**
     * @param {Presence} oldPresence 
     * @param {Presence} newPresence 
     */
    constructor(oldPresence, newPresence) {
        super(Events.PresenceUpdate);
        this.oldPresence = oldPresence;
        this.newPresence = newPresence;
    }

    /**
     * @returns {Presence}
     */
    getOldPresence() {
        return this.oldPresence;
    }

    /**
     * @returns {Presence}
     */
    getNewPresence() {
        return this.newPresence;
    }
}