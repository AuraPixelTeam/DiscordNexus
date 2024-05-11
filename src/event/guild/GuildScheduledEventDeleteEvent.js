import { GuildScheduledEvent } from "discord.js";
import { Events } from "../Events.js";
import { GuildEvent } from "./GuildEvent.js";

export class GuildScheduledEventDeleteEvent extends GuildEvent {

    guildScheduledEvent;
    /**
     * @param {GuildScheduledEvent} guildScheduledEvent 
     */
    constructor(guildScheduledEvent) {
        super(Events.GuildScheduledEventDelete, guildScheduledEvent.guild);
        this.guildScheduledEvent = guildScheduledEvent;
    }

    /**
     * @returns {GuildScheduledEvent}
     */
    getGuildScheduledEvent() {
        return this.guildScheduledEvent;
    }
}