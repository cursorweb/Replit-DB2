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
        } catch (e) {
            expect(e).toBeInstanceof(TypeError);
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
});