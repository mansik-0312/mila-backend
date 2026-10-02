const registerNotificationSocket = (io, socket) => {

    socket.on("register", ({ userId }) => {

        socket.join(userId);

        console.log(
            `User ${userId} joined room ${userId}`
        );

    });

};

module.exports = registerNotificationSocket;