import { GuildEmoji } from "discord.js";
import { Events } from "../Events.js";
import { GuildEvent } from "./GuildEvent.js";


export class GuildEmojiCreateEvent extends GuildEvent {

    emoji;

    /**
     * @param {GuildEmoji} emoji 
     */
    constructor(emoji) {
        super(Events.GuildEmojiCreate, emoji.guild);
        this.emoji = emoji;
    }

    /**
     * @returns {GuildEmoji}
     */
    getEmoji() {
        return this.emoji;
    }
}