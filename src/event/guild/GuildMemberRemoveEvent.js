import { GuildMember } from "discord.js";
import { Events } from "../Events.js";
import { GuildEvent } from "./GuildEvent.js";

export class GuildMemberRemoveEvent extends GuildEvent {

    guildMember;
    /**
     * @param {GuildMember} guildMember 
     */
    constructor(guildMember) {
        super(Events.GuildMemberRemove, guildMember.guild);
        this.guildMember = guildMember;
    }

    /**
     * @returns {GuildMember}
     */
    getGuildMember() {
        return this.guildMember;
    }
}