import { Collection, Guild, ThreadChannel } from "discord.js";
import { Events } from "../Events.js";
import { ThreadEvent } from "./ThreadEvent.js";


export class ThreadMembersUpdateEvent extends ThreadEvent {

    addedMembers;
    removedMembers;

    /**
     * 
     * @param {Collection} addedMembers 
     * @param {Collection} removedMembers 
     * @param {ThreadChannel} thread 
     */
    constructor(addedMembers, removedMembers, thread) {
        super(Events.ThreadMembersUpdate, thread);
        this.addedMembers = addedMembers;
        this.removedMembers = removedMembers;
    }

    /**
     * @returns {Collection}
     */
    getAddedMembers() {
        return this.addedMembers;
    }

    /**
     * @returns {Collection}
     */
    getRemovedMembers() {
        return this.removedMembers;
    }
}