import { Collection, Guild, ThreadChannel, ThreadMember } from "discord.js";
import { Events } from "../Events.js";
import { ThreadEvent } from "./ThreadEvent.js";


export class ThreadMemberUpdateEvent extends ThreadEvent {

    oldMember;
    newMember;

    /**
     * 
     * @param {ThreadMember} oldMember 
     * @param {ThreadMember} newMember 
     */
    constructor(oldMember, newMember) {
        super(Events.ThreadMemberUpdate, newMember.thread);
    }

    /**
     * @returns {Collection}
     */
    getOldMember() {
        return this.oldMember;
    }

    /**
     * @returns {Collection}
     */
    getNewMembers() {
        return this.newMember;
    }
}