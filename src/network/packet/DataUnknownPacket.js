import { DataPacket } from "./DataPacket.js";

export class DataUnknownPacket extends DataPacket {

    data;
    constructor() {
        super(0x01);
    }
    
    getData() {
        return this.data;
    }

    /**
     * @param {Buffer} input 
     */
    decodePayload(input) {
        this.data = input.slice(1).toString();
    }
}