const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../../config/postgres");

class Notification extends Model {}

Notification.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        userId: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        actorId: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        type: {
            type: DataTypes.ENUM(
                "LIKE",
                "MATCH",
                "MESSAGE",
                "PROFILE_VIEW"
            ),
            allowNull: false,
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        isRead: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },

        metadata: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: {},
        },

        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize,
        modelName: "Notification",
        tableName: "notifications",
        timestamps: true,
    }
);

module.exports = Notification;