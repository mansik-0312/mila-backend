const http = require("http");

const env = require("./src/config/env");
const connectDatabase = require("./src/config/database");
require("./src/config/redis");

const app = require("./src/app");

const { connectPostgres, sequelize } = require("./src/config/postgres");

require("./src/models/postgres/Notification");

const initializeSocket = require("./src/config/socket");

const PORT = env.PORT;

const startServer = async () => {
    try {
        await connectDatabase();

        await connectPostgres();

        await sequelize.sync({ alter: true });

        console.log("PostgreSQL Models Synced");

        // Create HTTP server
        const server = http.createServer(app);

        // Initialize Socket.IO
        initializeSocket(server);

        // Start server
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error(error);
    }
};

startServer();