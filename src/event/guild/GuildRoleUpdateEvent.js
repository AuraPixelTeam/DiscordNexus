import { Role } from "discord.js";
import { Events } from "../Events.js";
import { GuildEvent } from "./GuildEvent.js";

export class GuildRoleUpdateEvent extends GuildEvent {

    oldRole;
    newRole

    /**
     * @param {Role} oldRole 
     * @param {Role} newRole 
     */
    constructor(oldRole, newRole) {
        super(Events.GuildRoleUpdate, newRole.guild);
        this.oldRole = oldRole;
        this.newRole = newRole;
    }

    /**
     * @returns {Role}
     */
    getOldRole() {
        return this.oldRole;
    }

    /**
     * @returns {Role}
     */
    getNewRole() {
        return this.newRole;
    }
}