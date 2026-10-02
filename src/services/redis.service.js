const redis = require("../config/redis");

const set = async (key, value, ttl) => {
    await redis.set(
        key,
        JSON.stringify(value),
        "EX",
        ttl
    );
};

const get = async (key) => {
    const value = await redis.get(key);

    if (!value) {
        return null;
    }

    return JSON.parse(value);
};

const remove = async (key) => {
    await redis.del(key);
};

module.exports = {
    set,
    get,
    remove,
};