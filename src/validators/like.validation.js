const { z } = require("zod");

const likeUserSchema = z.object({
    fromUserId: z.string().min(1),
    toUserId: z.string().min(1),
});

module.exports = {
    likeUserSchema,
};