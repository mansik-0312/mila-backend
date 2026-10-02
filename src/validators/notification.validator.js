const { z } = require("zod");

const createNotificationSchema = z.object({
    userId: z.string().min(1),

    actorId: z.string().min(1),

    type: z.enum([
        "LIKE",
        "MATCH",
        "MESSAGE",
        "PROFILE_VIEW",
    ]),

    title: z.string().min(1),

    message: z.string().min(1),

    metadata: z.record(z.string(), z.any()).optional(),
});

module.exports = {
    createNotificationSchema,
};