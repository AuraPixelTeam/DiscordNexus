import { Message } from "discord.js";
import { MessageEvent } from "./MessageEvent.js";
import { Events } from "../Events.js";


export class MessageCreateEvent extends MessageEvent {

    /**
     * @param {Message} message 
     */
    constructor(message) {
        super(Events.MessageCreate, message);
    }
}