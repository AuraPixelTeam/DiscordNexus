import { Message } from "discord.js";
import { MessageEvent } from "./MessageEvent.js";
import { Events } from "../Events.js";


export class MessageDeleteEvent extends MessageEvent {

    /**
     * @param {Message} message 
     */
    constructor(message) {
        super(Events.MessageDelete, message);
    }
}