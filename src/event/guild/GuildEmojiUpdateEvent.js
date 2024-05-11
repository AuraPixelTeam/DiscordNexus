import { GuildEmoji } from "discord.js";
import { GuildEvent } from "./GuildEvent.js";
import { Events } from "../Events.js";


export class GuildEmojiUpdateEvent extends GuildEvent {

    oldEmoji;
    newEmoji;

    /**
     * @param {GuildEmoji} oldEmoji 
     * @param {GuildEmoji} newEmoji 
     */
    constructor(oldEmoji, newEmoji) {
        super(Events.GuildEmojiUpdate, newEmoji.guild);
        this.oldEmoji = oldEmoji;
        this.newEmoji = newEmoji;
    }

    /**
     * @returns {GuildEmoji}
     */
    getOldEmoji () {
        return this.oldEmoji;
    }

    /**
     * @returns {GuildEmoji}
     */
    getNewEmoji() {
        return this.newEmoji;
    }
}