const Notification = require("../models/postgres/Notification");

const createNotification = async (notificationData) => {
    return await Notification.create(notificationData);
};

const findById = async (id) => {
    return await Notification.findByPk(id);
};

const getNotificationsByUser = async (
    userId,
    page = 1,
    limit = 20
) => {

    const offset = (page - 1) * limit;

    return await Notification.findAndCountAll({
        where: {
            userId,
            isDeleted: false,
        },

        order: [
            ["createdAt", "DESC"],
        ],

        limit,
        offset,
    });
};

const markAsRead = async (id) => {
    return await Notification.update(
        {
            isRead: true,
        },
        {
            where: {
                id,
                isDeleted: false,
            },
        }
    );
};

const softDelete = async (id) => {
    return await Notification.update(
        {
            isDeleted: true,
        },
        {
            where: {
                id,
            },
        }
    );
};

module.exports = {
    createNotification,
    findById,
    getNotificationsByUser,
    markAsRead,
    softDelete,
};