import { Events } from "../Events.js";
import { GuildEvent } from "./GuildEvent.js";

export class GuildCreateEvent extends GuildEvent {

    constructor(guild) {
        super(Events.GuildCreate, guild);
    }
}