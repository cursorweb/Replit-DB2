require("dotenv").config();
const fs = require("fs/promises");
const fetch = require("node-fetch");

// todo: add debug mode
module.exports = class Client {
    constructor(options) {
        this._config = {
            url: process.env.REPLIT_DB_URL,
            debug: false,
            localFile: "database.json"
        };

        if (options) {
            if (options.url) this._config.url = options.url;
            if (options.debug) this._config.debug = true;
            if (options.localFile) this._config.localFile = options.localFile;
        }

        if (!this._config.url && !process.env.LOCAL_DEV) this._config.isLocal = true;
    }

    async get(key, options) {
        const url = this._config.url;

        let opt = {
            raw: options.raw || false,
            error: options.error || true,
            default: options.default || null
        };

        let result, text;
        result = text = await fetch(`${url}/${key}`).then(r => r.text());

        if (this._config.isLocal) {
            try {
                if (text == "") result = opt.default;
                else if (opt.raw) result = JSON.parse(text);
                else result = text;
            } catch {
                if (opt.error) throw new SyntaxError(
                    `Failed to parse value of ${key}, try passing a raw option to get the raw value`
                );
            }
        }

        return result;
    }
};