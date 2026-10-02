const Like = require("../models/mongo/Like");

const createLike = async (data) => {
    return await Like.create(data);
};

const findLike = async (fromUserId, toUserId) => {
    return await Like.findOne({
        fromUserId,
        toUserId,
    });
};

const deleteLike = async (fromUserId, toUserId) => {
    return await Like.findOneAndDelete({
        fromUserId,
        toUserId,
    });
};

module.exports = {
    createLike,
    findLike,
    deleteLike,
};