module.exports.encodeKey = key => {
    try {
        return encodeURIComponent(JSON.stringify(key));
    } catch {
        throw new TypeError("Replitdb2 cannot encode the key given. Make sure the key is an valid JSON object.");
    }
}

module.exports.decodeKey = key => {
    try {
        return decodeURIComponent(JSON.parse(key));
    } catch {
        throw new TypeError("Replitdb2 cannot decode the key given. Make sure the key is an valid JSON string.");
    }
}