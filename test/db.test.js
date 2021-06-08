// Tests the reading and writing of data
const Client = require("../src/index");
const db = new Client();

const empty = async () => await db.empty();
beforeAll(empty);
afterEach(empty);

describe("get method", () => {
    test("get value", async () => {
        await db.set("key", "value");
        expect(await db.get("key")).toEqual("value");
    });

    test("get value newline", async () => {
        await db.set("key\n", "value");
        expect(await db.get("key\n")).toEqual("value");
    });

    test("get invalid json", async () => {
        await db.set("key", "invalid json", { raw: true });
        try {
            await db.get("key");
            expect(false).toEqual(true); // it was supposed to throw error!
        } catch {
            expect(true).toEqual(true); // success!
        }
    });
});

describe("set method", () => {
    test("set db value", async () => {
        expect(await db.set("key", "value")).toBeUndefined();
    });

    test("set db value", async () => {
        expect(await db.set("key", "value")).toBeUndefined();
    });

    test("set invalid value", async () => {
        try {
            await db.set("key", new BigInt(69));
            expect(false).toEqual(true); // Supposed to throw error!
        } catch {
            expect(true).toEqual(true);
        }
    });
});

describe("delete method", () => {
    test("delete key", async () => {
        await db.set("key", "value");
        await db.delete("key");

        expect(await db.get("key")).toEqual(null);
    });
});

describe("list method", () => {
    test("list keys", async () => {
        await db.set("key", "value");
        await db.set("key2", "value2");
        await db.set("key3", "value3");

        expect(await db.list()).toEqual(["key", "key2", "key3"]);
    });

    test("list keys prefix", async () => {
        await db.set("key", "value");
        await db.set("akey2", "value2");
        await db.set("key3", "value3");

        expect(await db.list("k")).toEqual(["key", "key3"]);
    });
});

describe("empty method", () => {
    test("empty db", () => {
        await db.set("key", "value");
        await db.set("key2", "value2");
        await db.set("key3", "value3");
        await db.empty();

        expect(await db.list()).toEqual([]);
    });
});