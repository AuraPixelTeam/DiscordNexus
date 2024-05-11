import { GuildMember } from "discord.js";
import { Events } from "../Events.js";
import { GuildEvent } from "./GuildEvent.js";

export class GuildMemberUpdateEvent extends GuildEvent {

    oldMember;
    newMember;
    /**
     * @param {GuildMember} oldMember
     * @param {GuildMember} newMember
     */
    constructor(oldMember, newMember) {
        super(Events.GuildMemberUpdate, newMember.guild);
        this.oldMember = oldMember;
        this.newMember = newMember;
    }

    /**
     * @returns {GuildMember}
     */
    getOldMember() {
        return this.oldMember;
    }

    /**
     * @returns {GuildMember}
     */
    getNewMember() {
        return this.newMember;
    }
}