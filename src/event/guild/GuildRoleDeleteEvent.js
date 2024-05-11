import { Role } from "discord.js";
import { Events } from "../Events.js";
import { GuildEvent } from "./GuildEvent.js";

export class GuildRoleDeleteEvent extends GuildEvent {

    role;

    /**
     * @param {Role} role 
     */
    constructor(role) {
        super(Events.GuildRoleDelete, role.guild);
        this.role = role;
    }

    /**
     * @returns {Role}
     */
    getRole() {
        return this.role;
    }
}