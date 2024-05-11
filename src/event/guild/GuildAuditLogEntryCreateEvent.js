import { Guild, GuildAuditLogsEntry } from "discord.js";
import { Events } from "../Events.js";
import { GuildEvent } from "./GuildEvent.js";

export class GuildAuditLogEntryCreateEvent extends GuildEvent {

    auditLogEntry;
    guild;

    /**
     * 
     * @param {GuildAuditLogsEntry} auditLogEntry 
     * @param {Guild} guild 
     */
    constructor(auditLogEntry, guild) {
        super(Events.GuildCreate, guild);
        this.auditLogEntry = auditLogEntry;
    }

    /**
     * @returns {GuildAuditLogsEntry}
     */
    getAuditLogEntry() {
        return this.auditLogEntry;
    }
}