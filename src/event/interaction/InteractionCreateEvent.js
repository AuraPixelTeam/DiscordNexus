import { BaseInteraction } from "discord.js";
import { InteractionEvent } from "./InteractionEvent.js";
import { Events } from "../Events.js";

export class InteractionCreateEvent extends InteractionEvent {

    /**
     * @param {BaseInteraction} interaction 
     */
    constructor(interaction) {
        super(Events.InteractionCreate, interaction);
    }
}