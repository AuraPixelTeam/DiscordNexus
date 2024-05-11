import { DMChannel, GuildChannel } from "discord.js";
import { Event } from "../Event.js";


export class ChannelEvent extends Event {

    channel;

    /**
     * 
     * @param {string} eventName 
     * @param {GuildChannel|DMChannel} channel 
     */
    constructor(eventName, channel) {
        super(eventName);
        this.channel = channel;
    }

    /**
     * @returns {GuildChannel|DMChannel}
     */
    getChannel() {
        return this.channel;
    }
}