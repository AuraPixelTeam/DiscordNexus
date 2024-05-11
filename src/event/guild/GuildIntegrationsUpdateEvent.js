import { Events } from "../Events.js";
import { GuildEvent } from "./GuildEvent.js";

export class GuildIntegrationsUpdateEvent extends GuildEvent {

    constructor(guild) {
        super(Events.GuildIntegrationsUpdate, guild);
    }
}