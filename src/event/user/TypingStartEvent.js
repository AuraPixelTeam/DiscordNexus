import { Typing } from "discord.js";
import { Event } from "../Event.js";
import { Events } from "../Events.js";


export class TypingStartEvent extends Event {

    typing;

    /**
     * @param {Typing} typing 
     */
    constructor(typing) {
        super(Events.TypingStart);
        this.typing = typing;
    }

    /**
     * @returns {Typing}
     */
    getTyping() {
        return this.typing;
    }
}