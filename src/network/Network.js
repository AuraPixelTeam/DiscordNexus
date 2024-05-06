import { BotProperties } from "../BotProperties.js";
import { DiscordNexus } from "../DiscordNexus.js";
import { Translatable } from "../lang/Translatable.js";
import { TranslationKeys } from "../lang/TranslationKeys.js";
import { Internet } from "../utils/Internet.js";
import net from "net";
import { PacketManager } from "./packet/PacketManager.js";
import { PacketHandlingException } from "../exception/PacketHandlingException.js";
import { DataPacketReceiveEvent } from "../event/server/DataPacketReceiveEvent.js";

export class Network {

    nexus;
    packetManager;
    socket;

    /**
     * @param {DiscordNexus} nexus 
     */
    constructor(nexus) {
        this.nexus = nexus;
        this.packetManager = new PacketManager();
        this.#initExpress();
    }

    getNexus() {
        return this.nexus;
    }

    async #initExpress() {
        const port = this.getNexus().getNexusProperties().get(BotProperties.CRON_PORT);
        const currentIP = await Internet.getIP();

        this.socket = net.createServer(socket => {
            socket.on('data', (data) => {
                this.handleEncoded(data);
            })
        });
        this.socket.listen(port, () => {
            this.getNexus().getBaseConsole().info(this.getNexus().getLanguage().translate(new Translatable(TranslationKeys.NEXUS_START_CRON_INFO, [currentIP, port])))
        })
    }

    handleEncoded(payload) {
        const packet = this.packetManager.getPacket(payload);
        
        if (packet === null) {
            throw new PacketHandlingException(`Unknown packet received!`);
        } else {
            packet.decodePayload(payload);
            this.nexus.getPluginManager().callEvent(new DataPacketReceiveEvent(packet));
        }
    }
}