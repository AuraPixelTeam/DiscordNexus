import EventEmitter from "events";
import { Translatable } from "../lang/Translatable.js";
import { TranslationKeys } from "../lang/TranslationKeys.js";
import { pluginLoader } from "../loader/pluginLoader.js";
import { readdirSync } from "fs";
import { Events } from "../event/Events.js";
import { Event } from "../event/Event.js";
import { Listener } from "../event/Listener.js";
import { PluginEnableEvent } from "../event/plugin/PluginEnableEvent.js";

export class PluginManager {
    nexus;
    plugins;
    emitter;

    constructor(nexus) {
        this.nexus = nexus;
        this.plugins = [];
        this.emitter = new EventEmitter();
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

                this.nexus
                    .getBaseConsole()
                    .info(
                        Translatable.translate(
                            language.get(TranslationKeys.NEXUS_PLUGIN_ENABLING),
                            [pluginName, pluginVersion]
                        )
                    );
                this.install(plugin);
                this.onEvent(new PluginEnableEvent(plugin));
            });
        }
    }

    getPlugins() {
        return this.plugins;
    }

    getPlugin(pluginName) {
        return this.plugins[pluginName];
    }

    /**
     * @param {Event} event
     */
    onEvent(event) {
        this.emitter.emit(event.getEventName(), event);
    }

    registerEvents(listener) {
        if (listener instanceof Listener) {
            for (const event in Events) {
                const eventName = Events[event];
                if (typeof listener[eventName] === "function") {
                    this.emitter.on(eventName, (...args) => {
                        listener[eventName](...args);
                    });
                }
            }
        } else {
            throw new Error(`${listener.constructor.name} must be Listener`);
        }
    }

    disablePlugins() {
        const plugins = this.getPlugins();
        for (const pluginIndex in plugins) {
            const plugin = plugins[pluginIndex];
            this.nexus
                .getBaseConsole()
                .info(
                    Translatable.translate(
                        this.nexus.language.get(
                            TranslationKeys.NEXUS_PLUGIN_DISABLING
                        ),
                        [
                            plugin.getDescription().getName(),
                            plugin.getDescription().getVersion(),
                        ]
                    )
                );
            plugin.onDisable();
            this.plugins = this.plugins.splice(1, pluginIndex);
        }
    }
}
