import { Events } from "../Events.js";
import { GuildEvent } from "./GuildEvent.js";

export class GuildUnavailableEvent extends GuildEvent {

    constructor(guild) {
        super(Events.GuildUnavailable, guild);
    }
}