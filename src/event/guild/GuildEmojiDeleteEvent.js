import { GuildEmoji } from "discord.js";
import { Events } from "../Events.js";
import { GuildEvent } from "./GuildEvent.js";


export class GuildEmojiDeleteEvent extends GuildEvent {

    emoji;

    /**
     * @param {GuildEmoji} emoji 
     */
    constructor(emoji) {
        super(Events.GuildEmojiDelete, emoji.guild);
        this.emoji = emoji;
    }

    /**
     * @returns {GuildEmoji}
     */
    getEmoji() {
        return this.emoji;
    }
}