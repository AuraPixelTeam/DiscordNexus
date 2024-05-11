import { Invite } from "discord.js";
import { InviteEvent } from "./InviteEvent.js";
import { Events } from "../Events.js";

export class InviteDeleteEvent extends InviteEvent {

    /**
     * @param {Invite} invite 
     */
    constructor(invite) {
        super(Events.InviteDelete, invite);
    }
}