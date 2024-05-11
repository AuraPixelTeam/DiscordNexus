import { Guild } from "discord.js";
import { Events } from "../Events.js";
import { GuildEvent } from "./GuildEvent.js";

export class GuildUpdateEvent extends GuildEvent {

    oldGuild;

    /**
     * @param {Guild} oldGuild 
     * @param {Guild} newGuild 
     */
    constructor(oldGuild, newGuild) {
        super(Events.GuildUpdate, newGuild);
        this.oldGuild = oldGuild;
    }

    getOldGuild() {
        return this.oldGuild;
    }
}