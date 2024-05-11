import { GuildBan } from "discord.js";
import { Events } from "../Events.js";
import { GuildEvent } from "./GuildEvent.js";

export class GuildBanRemoveEvent extends GuildEvent {

    guildBan;
    /**
     * @param {GuildBan} guildBan 
     */
    constructor(guildBan) {
        super(Events.GuildBanRemove, guildBan.guild);
        this.guildBan = guildBan;
    }
    
    /**
     * @returns {GuildBan}
     */
    getGuildBan() {
        return this.guildBan;
    }
}