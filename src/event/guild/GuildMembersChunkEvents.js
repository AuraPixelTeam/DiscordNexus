import { Collection, Guild, GuildMember, GuildMembersChunk } from "discord.js";
import { Events } from "../Events.js";
import { GuildEvent } from "./GuildEvent.js";

export class GuildMembersChunkEvents extends GuildEvent {

    guildMember;
    chunk;
    /**
     * @param {Collection} members 
     * @param {Guild} guild
     * @param {*} chunk
     */
    constructor(members, guild, chunk) {
        super(Events.GuildMembersChunk, guild);
        this.members = members;
        this.chunk = chunk;
    }

    /**
     * @returns {Collection}
     */
    getMembers() {
        return this.members;
    }

    getChunk() {
        return this.chunk;
    }
}