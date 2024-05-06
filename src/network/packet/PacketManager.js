import { UnknownParameterException } from "../../exception/UnknownParameterException.js";
import { DataPacket } from "./DataPacket.js";
import { DataUnknownPacket } from "./DataUnknownPacket.js";


export class PacketManager {

    packets = [];

    constructor() {
        this.registerPacket(new DataUnknownPacket());
    }

    /**
     * @param {DataPacket} packet 
     */
    registerPacket(packet) {
        if (packet instanceof DataPacket) {
            this.packets[packet.getID()] = packet;
        } else {
            throw new UnknownParameterException(`Packet parameter unknown!`)
        }
    }

    /**
     * @param {*} id 
     * @returns {DataPacket|null}
     */
    getPacketById(id) {
        return this.packets[id] ?? null;
    }

    /**
     * @param {Buffer} buffer 
     * @returns {DataPacket|null}
     */
    getPacket(buffer) {
        return this.getPacketById(buffer.readUInt8(0));
    }
}