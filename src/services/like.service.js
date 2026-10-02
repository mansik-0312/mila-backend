const likeRepository = require("../repositories/like.repository");
const matchService = require("./match.service");

const likeUser = async (fromUserId, toUserId) => {

    if (fromUserId === toUserId) {
        throw new Error("You cannot like yourself.");
    }

    const existingLike = await likeRepository.findLike(
        fromUserId,
        toUserId
    );

    if (existingLike) {
        throw new Error("Already liked.");
    }

    await likeRepository.createLike({
        fromUserId,
        toUserId,
    });

    const reverseLike = await likeRepository.findLike(
        toUserId,
        fromUserId
    );

    if (!reverseLike) {
        return {
            matched: false,
        };
    }

    await matchService.handleMatch(
        fromUserId,
        toUserId
    );

    return {
        matched: true,
    };
};

module.exports = {
    likeUser,
};