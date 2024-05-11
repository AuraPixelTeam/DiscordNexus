import { Collection, Message } from "discord.js";
import { MessageEvent } from "./MessageEvent.js";
import { Events } from "../Events.js";


export class MessageReactionRemoveAllEvent extends MessageEvent {

    reactions;

    /**
     * @param {Message} message 
     * @param {Collection} reactions
     */
    constructor(message, reactions) {
        super(Events.MessageReactionRemoveAll, message);
        this.reactions = reactions;
    }

    /**
     * @returns {Collection}
     */
    getReactions() {
        return this.reactions;
    }
}