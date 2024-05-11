import { GuildChannel } from "discord.js";
import { Event } from "../Event.js";
import { Events } from "../Events.js";


export class ChannelPinsUpdateEvent extends Event {

    time;

    /**
     * @param {GuildChannel} channel 
     * @param {Date} time
     */
    constructor(channel, time) {
        super(Events.ChannelPinsUpdate, channel);
        this.time = time;
    }

    /**
     * @returns {Date}
     */
    getTime() {
        return this.time;
    }
}