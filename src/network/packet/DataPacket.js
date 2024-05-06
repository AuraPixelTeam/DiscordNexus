
export class DataPacket {

    ID;

    constructor(ID) {
        this.ID = ID;
    }

    getID() {
        return this.ID;
    }

    decodePayload(input) {}
}