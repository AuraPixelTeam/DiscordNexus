import { Events } from "../Events.js";
import { ModerationEvent } from "./ModerationEvent.js";


export class ApplicationCommandPermissionsUpdateEvent extends ModerationEvent {

    data;

    constructor(data) {
        super(Events.ApplicationCommandPermissionsUpdate, null);
        this.data = data;
    }

    getData() {
        return this.data;
    }
}