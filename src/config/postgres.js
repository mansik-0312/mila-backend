const { Sequelize } = require("sequelize");
const env = require("./env");

const sequelize = new Sequelize(
    env.POSTGRES_DATABASE,
    env.POSTGRES_USER,
    env.POSTGRES_PASSWORD,
    {
        host: env.POSTGRES_HOST,
        port: env.POSTGRES_PORT,
        dialect: "postgres",

        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },

        logging: false,
    }
);

const connectPostgres = async () => {
    try {
        await sequelize.authenticate();

        console.log("PostgreSQL Connected Successfully");
    } catch (error) {
        console.error("PostgreSQL Connection Error:", error.message);

        process.exit(1);
    }
};

module.exports = {
    sequelize,
    connectPostgres,
};