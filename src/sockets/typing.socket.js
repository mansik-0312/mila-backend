const registerTypingSocket = (io, socket) => {

    socket.on("typing_start", ({ toUserId, fromUserId }) => {

        io.to(toUserId).emit("user_typing", {
            userId: fromUserId,
        });

    });

    socket.on("typing_stop", ({ toUserId, fromUserId }) => {

        io.to(toUserId).emit("user_stopped_typing", {
            userId: fromUserId,
        });

    });

};

module.exports = registerTypingSocket;