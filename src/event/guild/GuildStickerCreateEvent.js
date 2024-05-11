import { Sticker } from "discord.js";
import { Events } from "../Events.js";
import { GuildEvent } from "./GuildEvent.js";


export class GuildStickerCreateEvent extends GuildEvent {

    sticker;

    /**
     * @param {Sticker} sticker 
     */
    constructor(sticker) {
        super(Events.GuildStickerCreate, sticker.guild);
        this.sticker = sticker;
    }

    /**
     * @returns {Sticker}
     */
    getSticker() {
        return this.sticker;
    }
}