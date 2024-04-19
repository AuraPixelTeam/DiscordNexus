import { PluginDescription } from "./PluginDescription.js";

export class PluginBase {

    nexus;
    description;

    constructor(nexus, description) {
        this.nexus = nexus;
        this.description = new PluginDescription(description);
    }

    getNexus() {
        return this.nexus;
    }

    getDescription() {
        return this.description;
    }   

    onLoad() {}

    onEnable() {}
}