import { Event } from "../Event.js";
import { Events } from "../Events.js";



export class ShardResumeEvent extends Event {

    id;
    replayedEvents;

    /**
     * @param {number} id 
     * @param {number} replayedEvents
     */
    constructor(id, replayedEvents) {
        super(Events.ShardResume);
        this.id = id;
        this.replayedEvents = replayedEvents;
    }

    /**
     * @returns {number}
     */
    getId() {
        return this.id;
    }

    /**
     * @returns {number}
     */
    getReplayedEvents() {
        return this.replayedEvents;
    }
}