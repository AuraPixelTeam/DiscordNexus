import { GuildChannel } from "discord.js";
import { Event } from "../Event.js";
import { Events } from "../Events.js";


export class ChannelCreateEvent extends Event {

    /**
     * @param {GuildChannel} channel 
     */
    constructor(channel) {
        super(Events.ChannelCreate, channel);
    }
}