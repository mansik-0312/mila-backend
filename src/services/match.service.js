const notificationService = require("./notification.service");
const { getIO } = require("../config/socket");

const handleMatch = async (userA, userB) => {

    await notificationService.sendNotification({
        userId: userA,
        actorId: userB,
        type: "MATCH",
        title: "It's a Match ❤️",
        message: "You both liked each other.",
    });

    await notificationService.sendNotification({
        userId: userB,
        actorId: userA,
        type: "MATCH",
        title: "It's a Match ❤️",
        message: "You both liked each other.",
    });

    const io = getIO();

    io.to(userA).emit("match_found", {
        userId: userB,
    });

    io.to(userB).emit("match_found", {
        userId: userA,
    });

    console.log(`Match created between ${userA} and ${userB}`);

};

module.exports = {
    handleMatch,
};