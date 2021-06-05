require("dotenv").config();
const fs = require("fs").promises;
const fetch = require("node-fetch");

const { CONST_OPT, GET_OPT } = require("./constants");


// todo: add debug mode
// todo: add local dev
module.exports = class Client {
    constructor(options = CONST_OPT) {
        this._config = Object.assign(CONST_OPT, options);

        if (
            (!this._config.url) || // it is most likely local dev (no replit db url)
            process.env.LOCAL_DEV // the user specified
        ) this._config.isLocal = true;
    }

    async get(key, options = GET_OPT) {
        const url = this._config.url;

        let opt = Object.assign(GET_OPT, options);

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