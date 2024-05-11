import { Message } from "discord.js";
import { Event } from "../Event.js";

export class MessageEvent extends Event {

    message;

    /**
     * @param {string} eventName 
     * @param {Message|null} message 
     */
    constructor(eventName, message) {
        super(eventName);
        this.message = message;
    }

    /**
     * @returns {Message|null}
     */
    getMessage() {
        return this.message;
    }
}