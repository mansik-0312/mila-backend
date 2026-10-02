const { Server } = require("socket.io");

const registerSocketEvents =
    require("../events/socket.events");

let io;

const initializeSocket = (server) => {

    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PATCH", "DELETE"],
        },
    });

    io.on("connection", (socket) => {

        console.log(
            `Socket Connected: ${socket.id}`
        );

        registerSocketEvents(io, socket);

        socket.on("disconnect", () => {

            console.log(
                `Socket Disconnected: ${socket.id}`
            );

        });

    });

    return io;
};

const getIO = () => {

    if (!io) {
        throw new Error("Socket.IO is not initialized");
    }

    return io;
};

module.exports = initializeSocket;
module.exports.getIO = getIO;