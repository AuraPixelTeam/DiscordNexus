import {
    existsSync,
    readFileSync,
    writeFileSync,
    mkdirSync,
    readdirSync
} from "fs";
import { stringify , parse } from 'ini'
import { LanguageNotFoundException } from "./LanguageNotFoundException.js";
import { TranslationKeys } from "./TranslationKeys.js";
import { Translatable } from "./Translatable.js";

export class Language {

    static getLanguages() {
        const languagePath = LANGUAGE_PATH;
        if (existsSync(languagePath)) {
            const allFiles = readdirSync(languagePath).filter((filename) => filename.split('.').pop() == "ini");

            const langs = [];
            for (const file of allFiles) {
                const code = file.split('.').shift();
                const arr = Language.loadLang(languagePath, code);
                if (arr[TranslationKeys.NEXUS_LANGUAGE_NAME]) {
                    langs[code] = arr[TranslationKeys.NEXUS_LANGUAGE_NAME]
                }
            }
            return langs;
        }
    }

    static loadLang(path, langCode) {
        const file = `${path}/${langCode}.ini`;
        if (existsSync(file)) {
            return parse(readFileSync(file, 'utf-8'));
        }
        throw new LanguageNotFoundException(`Language ${langCode} not found!`);
    }

    languageName;
    lang;

    constructor(language) {
        this.lang = Language.loadLang(LANGUAGE_PATH, language);
    }

    getName() {
        return this.get(TranslationKeys.NEXUS_LANGUAGE_NAME);
    }

    getLang() {
        return this.languageName;
    }

    get(id) {
        return this.lang[id] ?? '';
    }

    getAll() {
        return this.lang;
    }

    /**
     * @param {Translatable} i 
     */
    translate(i) {
        let text = this.get(i.getText());
        const params = i.getParams();
        for (let key in params) {
            const value = params[key];
            text = text.replace(`%${key}`, value);
        }
        return text;
    }
}