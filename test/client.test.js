// Tests the initialization of the Client.
const Client = require("../src/index");
const DB_URL = process.env.REPLIT_DB_URL;

afterEach(() => {
    process.env.REPLIT_DB_URL = DB_URL;
    process.env.LOCAL_DEV = "";
});

describe("client initialization", () => {
    test("no arguments provided", () => {
        const db = new Client();

        expect(db._config.url).toEqual(DB_URL);
        expect(db._config.debug).toEqual(false);
    });

    test("local_dev environment set", () => {
        process.env.LOCAL_DEV = "true";
        const db = new Client();

        expect(db._config._isLocal).toEqual(true);
    });

    test("no url provided", () => {
        process.env.REPLIT_DB_URL = "";
        const db = new Client();

        expect(db._config._isLocal).toEqual(true);
    });
});