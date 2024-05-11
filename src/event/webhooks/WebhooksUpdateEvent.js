import { ForumChannel, NewsChannel, StageChannel, TextChannel, VoiceChannel } from "discord.js";
import { Event } from "../Event.js";
import { Events } from "../Events.js";


export class WebhooksUpdateEvent extends Event {
    
    channel;

    constructor(channel) {
        super(Events.WebhooksUpdate);
        this.channel = channel;
    }

    /**
     * 
     * @returns {TextChannel | NewsChannel | VoiceChannel | StageChannel | ForumChannel}
     */
    getChannel() {
        return this.channel;
    }
}