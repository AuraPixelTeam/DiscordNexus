import { cpuUsage, hrtime, memoryUsage } from "process";
import v8 from "v8";

export class Process {

    /**
     * Amount of space occupied in the main memory device (bytes).
     * @returns {number}
     */
    static getMainMemoryUsage() {
        return memoryUsage().rss;
    }

    /**
     * The amount of memory used by the V8 engine (bytes).
     * @returns {number}
     */
    static getMemoryTotalUsage() {
        return memoryUsage().heapTotal;
    }

    /**
     * The amount of memory used by the V8 engine (bytes).
     * @returns {number}
     */
    static getMemoryUsage() {
        return memoryUsage().heapUsed;
    }

    static getMemoryUsagePercent() {
        const memoryUsage = this.getMemoryUsage();
        const totalMemory = os.totalmem();
        return (memoryUsage / totalMemory) * 100;
    }

    static setMemoryLimit(memory) {
        v8.setFlagsFromString(`--max-old-space-size=${memory}`);
    }

    /**
     * @returns {number}
     */
    static getCpuUsage() {
        return cpuUsage();
    }
}