const redis = require("../config/redis");

const setUserOnline = async (userId) => {

    await redis.set(
        `online:${userId}`,
        "true"
    );

};

const setUserOffline = async (userId) => {

    await redis.del(
        `online:${userId}`
    );

    await redis.set(
        `last_seen:${userId}`,
        new Date().toISOString()
    );

};

const isUserOnline = async (userId) => {

    const online = await redis.get(
        `online:${userId}`
    );

    return online === "true";

};

const getLastSeen = async (userId) => {

    return await redis.get(
        `last_seen:${userId}`
    );

};

module.exports = {
    setUserOnline,
    setUserOffline,
    isUserOnline,
    getLastSeen,
};