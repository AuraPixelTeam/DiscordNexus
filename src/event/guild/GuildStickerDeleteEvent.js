import { Sticker } from "discord.js";
import { Events } from "../Events.js";
import { GuildEvent } from "./GuildEvent.js";


export class GuildStickerDeleteEvent extends GuildEvent {

    sticker;

    /**
     * @param {Sticker} sticker 
     */
    constructor(sticker) {
        super(Events.GuildStickerDelete, sticker.guild);
        this.sticker = sticker;
    }

    /**
     * @returns {Sticker}
     */
    getSticker() {
        return this.sticker;
    }
}