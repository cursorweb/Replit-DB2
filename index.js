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

    get(key, options) {
        let opt = {
            raw: options.raw || false,
            error: options.error || true,
            default: options.default || null
        };

        if (this._config.isLocal) {
            try {
                JSON.parse();
            } catch {
                throw new Error("");
            }
        }
    }
};