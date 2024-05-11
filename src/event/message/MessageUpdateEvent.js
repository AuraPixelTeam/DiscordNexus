import { Message } from "discord.js";
import { MessageEvent } from "./MessageEvent.js";
import { Events } from "../Events.js";


export class MessageUpdateEvent extends MessageEvent {

    oldMessage;

    /**
     * @param {Message} oldMessage 
     * @param {Message} newMessage 
     */
    constructor(oldMessage, newMessage) {
        super(Events.MessageCreate, newMessage);
        this.oldMessage = oldMessage;
    }

    /**
     * @returns {Message}
     */
    getOldMessage() {
        return this.oldMessage;
    }
}