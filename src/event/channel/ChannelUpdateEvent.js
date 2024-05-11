import { DMChannel, GuildChannel } from "discord.js";
import { Event } from "../Event.js";
import { Events } from "../Events.js";


export class ChannelUpdateEvent extends Event {

    oldChannel;

    /**
     * @param {GuildChannel|DMChannel} channel 
     */
    constructor(oldChannel, newChannel) {
        super(Events.ChannelUpdate, newChannel);
        this.oldChannel = oldChannel;
    }

    /**
     * @returns {GuildChannel|DMChannel}
     */
    getOldChannel() {
        return this.oldChannel;
    }
}