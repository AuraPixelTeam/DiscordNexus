import { Events } from "../Events.js";
import { GuildEvent } from "./GuildEvent.js";

export class GuildDeleteEvent extends GuildEvent {

    constructor(guild) {
        super(Events.GuildDelete, guild);
    }
}