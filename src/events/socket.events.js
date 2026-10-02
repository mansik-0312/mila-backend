const registerNotificationSocket = require("../sockets/notification.socket");
const registerPresenceSocket = require("../sockets/presence.socket");
const registerTypingSocket = require("../sockets/typing.socket");
const registerMatchSocket = require("../sockets/match.socket");

const registerSocketEvents = (io, socket) => {

    registerPresenceSocket(io, socket);

    registerNotificationSocket(io, socket);

    registerTypingSocket(io, socket);

    registerMatchSocket(io, socket);

};

module.exports = registerSocketEvents;