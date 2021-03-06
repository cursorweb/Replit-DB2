module.exports = Object.freeze({
    CONST_OPT: {
        url: process.env.REPLIT_DB_URL,
        debug: false,
        localFile: "database.json"
    },
    GET_OPT: {
        raw: false,
        error: true,
        default: null
    },
    SET_OPT: {
        raw: false,
        overwrite: true
    },
    GETALL_OPT: {
        prefix: "",
        raw: false,
        error: true
    },
    FINDKEYS_OPT: {
        caseSensitive: false
    }
});