require("dotenv").config();
const fs = require("fs").promises;
const fetch = require("node-fetch");

const { CONST_OPT, GET_OPT, SET_OPT, GETALL_OPT, SETALL_OPT, FINDKEYS_OPT } = require("./constants");
const { encodeKey, decodeKey } = require("./util");


// todo: add debug mode
// todo: add local dev
module.exports = class Client {
    constructor(options = CONST_OPT) {
        this._config = Object.assign(CONST_OPT, options);

        if (
            (!this._config.url) || // it is most likely local dev (no replit db url)
            process.env.LOCAL_DEV // the user specified
        ) this._config._isLocal = true;
    }

    async get(key, options = GET_OPT) {
        const url = this._config.url;
        const k = encodeKey(key);

        let opt = Object.assign(GET_OPT, options);

        let result, text;
        result = text = await fetch(`${url}/${k}`).then(r => r.text());

        try {
            if (text == "") result = opt.default; // no content
            else if (!opt.raw) result = JSON.parse(text); // set as json
            // is raw
        } catch {
            if (opt.error) throw new TypeError(
                `Failed to parse value of ${key}, try setting 'options.raw' to true.`
            );
        }

        return result;
    }

    async set(key, value, options = SET_OPT) {
        let opt = Object.assign(SET_OPT, options);
        if (!opt.overwrite && await this.exists(key)) return;

        const url = this._config.url;
        const k = encodeKey(key);

        let val;

        try {
            // in raw mode, we do not need to do .toString
            // js handles this for us!
            val = opt.raw ? value : JSON.stringify(value);
        } catch {
            throw new TypeError(
                `Failed to set value of ${key}, try setting 'options.raw' to true.`
            );
        }

        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `${k}=${val}`
        });
    }

    async delete(key) {
        const url = this._config.url;
        const k = encodeKey(key);

        await fetch(`${url}/${k}`, { method: "DELETE" });
    }

    async list(prefix = "") {
        const url = this._config.url;
        const pfix = prefix ? encodeKey(prefix) : prefix; // ensure that prefix was actually specified
        const rawKeys = await fetch(`${url}?prefix=${pfix}`).then(r => r.text());

        if (rawKeys == "") return [];
        else return rawKeys.split("\n").map(decodeKey);
    }


    async empty(prefix = "") {
        // promise.all offers more speed
        let promises = [];

        for (const key of await this.list(prefix)) {
            promises.push(this.delete(key));
        }

        await Promise.all(promises);
    }

    async getAll(options = GETALL_OPT) {
        let opt = Object.assign(GETALL_OPT, options);

        let output = [];
        for (const key of await this.list(prefix)) {
            const value = await this.get(key, {
                raw: opt.raw,
                error: opt.error
            });
            output[key] = value;
        }

        return output;
    }

    async setAll(obj, options) {
        let opt = Object.assign(SET_OPT, options);
        let promises = [];

        for (const key in obj) {
            let val = obj[key];
            promises.push(this.set(key, val, opt));
        }

        await Promise.all(promises);
    }

    async deleteMultiple(...keys) {
        let promises = [];

        for (const key of keys) {
            promises.push(this.delete(key));
        }

        await Promise.all(promises);
    }

    async zipAll() {
        let output = [];

        for (const key of await this.list()) {
            output.push([key, await this.get(key)]);
        }

        return output;
    }

    async keyExists(key) {
        return !!(await this.get(key, { raw: true }));
    }

    async findKeys(query, options) {
        let opt = Object.assign(FINDKEYS_OPT, options);

        return (await this.list()).filter(k =>
            opt.caseSensitive
                ? k.indexOf(query.toLowerCase()) > -1
                : k.toLowerCase().indexOf(query.toLowerCase()) > -1
        );
    }


    // Aliases
    clear = this.empty;
    all = this.list;
    del = this.deleteMultiple;
    zip = this.zipAll;
    exists = this.keyExists;
};