
export class PluginManager {

    nexus;
    plugins;

    constructor(nexus) {
        this.nexus = nexus;
        this.plugins = [];
    }

    install(plugin) {
        const pluginName = plugin.getDescription().getName();

        if (this.plugins[pluginName]) {
            throw new Error(`Đã tồn tại plugin ${pluginName}`);
        } else {
            this.plugins[pluginName] = plugin;
            plugin.onEnable();
        }
    }

    getPlugin(pluginName) {
        return this.plugins[pluginName];
    }
}