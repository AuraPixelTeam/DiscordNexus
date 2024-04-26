import { Translatable } from "../lang/Translatable.js";
import { TranslationKeys } from "../lang/TranslationKeys.js";
import { pluginLoader } from "../loader/pluginLoader.js";
import {
    readdirSync
} from "fs";

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

    loadPlugins(pluginsPath) {
        const plugins = readdirSync(pluginsPath);
        for (let dirName of plugins) {
            const pluginDirPath = `${pluginsPath}/${dirName}`;
            const loader = new pluginLoader(this.nexus, pluginDirPath);
            const language = this.nexus.getLanguage();
            loader.load().then(() => {
                const plugin = loader.getPlugin();
                const pluginName = plugin.getDescription().getName();
                const pluginVersion = plugin.getDescription().getVersion();

                this.nexus.getBaseConsole().info(Translatable.translate(language.get(TranslationKeys.NEXUS_PLUGIN_ENABLING), [pluginName, pluginVersion]));
                this.install(plugin);
            })
        }
    }

    getPlugins() {
        return this.plugins;
    }

    getPlugin(pluginName) {
        return this.plugins[pluginName];
    }

    disablePlugins() {
        const plugins = this.getPlugins();
        for (const pluginIndex in plugins) {
            const plugin = plugins[pluginIndex];
            this.nexus.getBaseConsole().info(Translatable.translate(
                this.nexus.language.get(
                    TranslationKeys.NEXUS_PLUGIN_DISABLING), 
                    [
                        plugin.getDescription().getName(),
                        plugin.getDescription().getVersion()
                    ]
                )
            );
            plugin.onDisable();
            this.plugins = this.plugins.splice(1, pluginIndex);
        }
    }
}