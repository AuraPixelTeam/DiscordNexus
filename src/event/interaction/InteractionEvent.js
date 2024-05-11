import { BaseInteraction } from "discord.js";
import { Event } from "../Event.js";

export class InteractionEvent extends Event {

    interaction;

    /**
     * @param {string} eventName 
     * @param {BaseInteraction} interaction
     */
    constructor(eventName, interaction) {
        super(eventName);
        this.interaction = interaction;
    }

    /**
     * @returns {BaseInteraction}
     */
    getInteraction() {
        return this.interaction;
    }
}