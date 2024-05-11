import { GuildScheduledEvent } from "discord.js";
import { Events } from "../Events.js";
import { GuildEvent } from "./GuildEvent.js";

export class GuildScheduledEventUpdateEvent extends GuildEvent {

    oldGuildScheduledEvent;
    newGuildScheduledEvent
    /**
     * @param {GuildScheduledEvent} oldGuildScheduledEvent 
     * @param {GuildScheduledEvent} newGuildScheduledEvent 
     */
    constructor(oldGuildScheduledEvent, newGuildScheduledEvent) {
        super(Events.GuildScheduledEventUpdate, newGuildScheduledEvent.guild);
        this.oldGuildScheduledEvent = oldGuildScheduledEvent;
        this.oldGuildScheduledEvent = newGuildScheduledEvent;
    }

    /**
     * @returns {GuildScheduledEvent}
     */
    getOldGuildScheduledEvent() {
        return this.oldGuildScheduledEvent;
    }

    /**
     * @returns {GuildScheduledEvent}
     */
    getNewGuildScheduledEvent() {
        return this.newGuildScheduledEvent;
    }
}