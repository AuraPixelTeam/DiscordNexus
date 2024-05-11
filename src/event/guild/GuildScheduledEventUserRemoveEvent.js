import { GuildScheduledEvent, User } from "discord.js";
import { Events } from "../Events.js";
import { GuildEvent } from "./GuildEvent.js";

export class GuildScheduledEventUserRemoveEvent extends GuildEvent {

    guildScheduledEvent;
    user;
    /**
     * @param {GuildScheduledEvent} guildScheduledEvent 
     * @param {User} user 
     */
    constructor(guildScheduledEvent, user) {
        super(Events.GuildScheduledEventUserRemove, guildScheduledEvent.guild);
        this.guildScheduledEvent = guildScheduledEvent;
        this.user = user;
    }

    /**
     * @returns {GuildScheduledEvent}
     */
    getGuildScheduledEvent() {
        return this.guildScheduledEvent;
    }

    /**
     * @returns {User}
     */
    getUser() {
        return this.user;
    }
}