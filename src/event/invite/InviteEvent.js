import { Invite } from "discord.js";
import { Event } from "../Event.js";

export class InviteEvent extends Event {

    invite;

    /**
     * @param {string} eventName 
     * @param {Invite} invite 
     */
    constructor(eventName, invite) {
        super(eventName);
        this.invite = invite;
    }

    /**
     * @returns {Invite}
     */
    getInvite() {
        return this.invite;
    }
}