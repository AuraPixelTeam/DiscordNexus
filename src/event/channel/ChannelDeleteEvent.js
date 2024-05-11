import { DMChannel, GuildChannel } from "discord.js";
import { Event } from "../Event.js";
import { Events } from "../Events.js";


export class ChannelDeleteEvent extends Event {

    /**
     * @param {GuildChannel|DMChannel} channel 
     */
    constructor(channel) {
        super(Events.ChannelDelete, channel);
    }
}