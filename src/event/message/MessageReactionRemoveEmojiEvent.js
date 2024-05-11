import { MessageReaction, User } from "discord.js";
import { MessageEvent } from "./MessageEvent.js";
import { Events } from "../Events.js";


export class MessageReactionRemoveEmojiEvent extends MessageEvent {

    messageReaction;

    /**
     * @param {MessageReaction} messageReaction 
     */
    constructor(messageReaction, user) {
        super(Events.MessageReactionRemoveEmoji, messageReaction.message);
        this.messageReaction = messageReaction;
    }

    /**
     * @returns {MessageReaction}
     */
    getMessageReaction() {
        return this.messageReaction;
    }
}