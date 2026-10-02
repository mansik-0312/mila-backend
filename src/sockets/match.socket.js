const registerMatchSocket = (io, socket) => {

    socket.on("match_acknowledged", ({ userId }) => {

        console.log(
            `${userId} acknowledged match`
        );

    });

};

module.exports = registerMatchSocket;