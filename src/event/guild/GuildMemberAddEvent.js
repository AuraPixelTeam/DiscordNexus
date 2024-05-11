import { GuildMember } from "discord.js";
import { Events } from "../Events.js";
import { GuildEvent } from "./GuildEvent.js";

export class GuildMemberAddEvent extends GuildEvent {

    guildMember;
    /**
     * @param {GuildMember} guildMember 
     */
    constructor(guildMember) {
        super(Events.GuildMemberAdd, guildMember.guild);
        this.guildMember = guildMember;
    }

    /**
     * @returns {GuildMember}
     */
    getGuildMember() {
        return this.guildMember;
    }
}