import { Sticker } from "discord.js";
import { Events } from "../Events.js";
import { GuildEvent } from "./GuildEvent.js";


export class GuildStickerUpdateEvent extends GuildEvent {

    sticker;
    newSticker;

    /**
     * @param {Sticker} oldSticker 
     * @param {Sticker} newSticker 
     */
    constructor(oldSticker, newSticker) {
        super(Events.GuildStickerUpdate, newSticker.guild);
        this.oldSticker = oldSticker;
        this.newSticker = newSticker;
    }

    /**
     * @returns {Sticker}
     */
    getOldSticker() {
        return this.oldSticker;
    }

    /**
     * @returns {Sticker}
     */
    getNewSticker() {
        return this.newSticker;
    }
}