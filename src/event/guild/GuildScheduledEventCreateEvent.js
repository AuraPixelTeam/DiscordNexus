import { GuildScheduledEvent } from "discord.js";
import { Events } from "../Events.js";
import { GuildEvent } from "./GuildEvent.js";

export class GuildScheduledEventCreateEvent extends GuildEvent {

    guildScheduledEvent;
    /**
     * @param {GuildScheduledEvent} guildScheduledEvent 
     */
    constructor(guildScheduledEvent) {
        super(Events.GuildScheduledEventCreate, guildScheduledEvent.guild);
        this.guildScheduledEvent = guildScheduledEvent;
    }

    /**
     * @returns {GuildScheduledEvent}
     */
    getGuildScheduledEvent() {
        return this.guildScheduledEvent;
    }
}