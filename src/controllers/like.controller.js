const likeService = require("../services/like.service");

const likeUser = async (req, res, next) => {
    try {

        const { fromUserId, toUserId } = req.body;

        const result = await likeService.likeUser(
            fromUserId,
            toUserId
        );

        return res.status(200).json({
            success: true,
            message: result.matched
                ? "It's a Match ❤️"
                : "User liked successfully.",
            data: result,
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    likeUser,
};