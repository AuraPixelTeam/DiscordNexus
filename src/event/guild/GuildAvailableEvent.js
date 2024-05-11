import { Events } from "../Events.js";
import { GuildEvent } from "./GuildEvent.js";

export class GuildAvailableEvent extends GuildEvent {

    constructor(guild) {
        super(Events.GuildAvailable, guild);
    }
}