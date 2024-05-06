import { DataPacket } from "../../network/packet/DataPacket.js";
import { Events } from "../Events.js";
import { ServerEvent } from "./ServerEvent.js";

export class DataPacketReceiveEvent extends ServerEvent {

    packet;
    constructor(packet) {
        super(Events.DATA_PACKET_RECEIVE_EVENT);
        this.packet = packet;
    }

    /**
     * @returns {DataPacket}
     */
    getPacket() {
        return this.packet;
    }
}