import { DiscordNexus } from "./DiscordNexus.js";
import { NexusPropertiesConstants } from "./NexusPropertiesConstants.js";
import { LocalData } from "./utils/LocalData.js";
import { Process } from "./utils/Process.js";


export class MemoryManager {

    memoryLimit;

    /**
     * @param {DiscordNexus} nexus 
     */
    constructor(nexus) {
        this.#init(nexus.getNexusConfig());
    }

    /**
     * @param {LocalData} nexusConfig 
     */
    #init(nexusConfig) {
        this.memoryLimit = nexusConfig.getNested(NexusPropertiesConstants.MEMORY_LIMIT);
        
        if (this.memoryLimit > 0) {
            Process.setMemoryLimit(this.memoryLimit);
        }
    }
}