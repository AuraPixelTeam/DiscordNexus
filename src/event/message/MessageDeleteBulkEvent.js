import { Collection } from "discord.js";
import { MessageEvent } from "./MessageEvent.js";
import { Events } from "../Events.js";


export class MessageDeleteBulkEvent extends MessageEvent {

    messages;
    channel;

    /**
     * @param {Collection} messages 
     * @param {*} channel 
     */
    constructor(messages, channel) {
        super(Events.MessageBulkDelete, null);
        this.messages = messages;
        this.channel = channel;
    }

    /**
     * @returns {Collection}
     */
    getMessages() {
        return this.messages;
    }

    /**
     * 
     * @returns {*}
     */
    getChannel() {
        return this.channel;
    }
}