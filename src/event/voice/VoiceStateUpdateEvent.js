import { VoiceState } from "discord.js";
import { Event } from "../Event.js";
import { Events } from "../Events.js";


export class VoiceStateUpdateEvent extends Event {

    oldState;
    newState;

    /**
     * @param {VoiceState} oldState 
     * @param {VoiceState} newState 
     */
    constructor(oldState, newState) {
        super(Events.VoiceStateUpdate);
        this.oldState = oldState;
        this.newState = newState;
    }

    /**
     * @returns {VoiceState}
     */
    getOldState() {
        return this.oldState;
    }

    /**
     * @returns {VoiceState}
     */
    getNewState() {
        return this.newState;
    }
}