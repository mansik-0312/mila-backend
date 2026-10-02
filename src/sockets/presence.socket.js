const presenceService = require("../services/presence.service");

const registerPresenceSocket = (io, socket) => {

    socket.on("register", async ({ userId }) => {

        if (!userId) {
            return;
        }

        // Save user on socket for disconnect event
        socket.userId = userId;

        // Join personal room
        socket.join(userId);

        // Store online status
        await presenceService.setUserOnline(userId);

        console.log(`User ${userId} is online`);

        // Notify everyone that user came online
        socket.broadcast.emit("user_online", {
            userId,
        });

    });

    socket.on("disconnect", async () => {

        if (!socket.userId) {
            return;
        }

        await presenceService.setUserOffline(socket.userId);

        console.log(`User ${socket.userId} is offline`);

        socket.broadcast.emit("user_offline", {
            userId: socket.userId,
            lastSeen: new Date().toISOString(),
        });

    });

};

module.exports = registerPresenceSocket;