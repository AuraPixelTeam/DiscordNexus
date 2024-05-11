import { MessageReaction, User } from "discord.js";
import { MessageEvent } from "./MessageEvent.js";
import { Events } from "../Events.js";


export class MessageReactionRemoveEvent extends MessageEvent {

    messageReaction;
    user;

    /**
     * @param {MessageReaction} messageReaction 
     * @param {User} user
     */
    constructor(messageReaction, user) {
        super(Events.MessageReactionRemove, messageReaction.message);
        this.messageReaction = messageReaction;
        this.user = user;
    }

    /**
     * @returns {MessageReaction}
     */
    getMessageReaction() {
        return this.messageReaction;
    }

    /**
     * @returns {User}
     */
    getUser() {
        return this.user;
    }
}