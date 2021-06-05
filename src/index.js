require("dotenv").config();
const fs = require("fs").promises;
const fetch = require("node-fetch");

const DEFAULT_OPT = {
    url: process.env.REPLIT_DB_URL,
    debug: false,
    localFile: "database.json"
};

// todo: add debug mode
module.exports = class Client {
    constructor(options = DEFAULT_OPT) {
        this._config = Object.assign(DEFAULT_OPT, options);

        if (
            (!this._config.url) || // it is most likely local dev (no replit db url)
            process.env.LOCAL_DEV // the user specified
        ) this._config.isLocal = true;
    }

    async get(
        key,
        options = {
            raw: false,
            error: true,
            default: null
        }) {
        const url = this._config.url;

        let opt = Object.assign({
            raw: options.raw || false,
            error: options.error || true,
            default: options.default || null
        });

        let result, text;
        result = text = await fetch(`${url}/${key}`).then(r => r.text());

        if (!this._config.isLocal) {
            try {
                if (text == "") result = opt.default; // no content
                else if (!opt.raw) result = JSON.parse(text); // set as json
                // is raw
            } catch {
                if (opt.error) throw new SyntaxError(
                    `Failed to parse value of ${key}, try passing a raw option to get the raw value`
                );
            }
        }

        return result;
    }
};