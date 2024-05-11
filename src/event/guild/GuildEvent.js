import { Guild } from "discord.js";
import { Event } from "../Event.js";

export class GuildEvent extends Event {

    guild;

    /**
     * @param {string} eventName 
     * @param {Guild} guild 
     */
    constructor(eventName, guild) {
        super(eventName);
        this.guild = guild;
    }

    /**
     * @returns {Guild}
     */
    getGuild() {
        return this.guild;
    }
}