const notificationRepository = require("../repositories/notification.repository");
const { getIO } = require("../config/socket");

const sendNotification = async (notificationData) => {

    const notification =
        await notificationRepository.createNotification(
            notificationData
        );

    const io = getIO();

    io.to(notification.userId).emit(
        "new_notification",
        notification
    );

    console.log(
        `Notification emitted to ${notification.userId}`
    );

    return notification;
};

const getUserNotifications = async (
    userId,
    page = 1,
    limit = 20
) => {

    page = Number(page);
    limit = Number(limit);

    if (page < 1) page = 1;

    if (limit < 1) limit = 20;

    if (limit > 100) limit = 100;

    const result =
        await notificationRepository.getNotificationsByUser(
            userId,
            page,
            limit
        );

    return {
        notifications: result.rows,

        pagination: {
            page,
            limit,
            total: result.count,
            totalPages: Math.ceil(result.count / limit),
        },
    };
};

const markNotificationAsRead = async (id) => {

    const notification =
        await notificationRepository.findById(id);

    if (!notification) {
        throw new Error("Notification not found");
    }

    if (notification.isDeleted) {
        throw new Error("Notification has already been deleted");
    }

    if (notification.isRead) {
        throw new Error("Notification is already marked as read");
    }

    await notificationRepository.markAsRead(id);

    return {
        success: true,
        message: "Notification marked as read",
    };
};

const deleteNotification = async (id) => {

    const notification =
        await notificationRepository.findById(id);

    if (!notification) {
        throw new Error("Notification not found");
    }

    if (notification.isDeleted) {
        throw new Error("Notification already deleted");
    }

    await notificationRepository.softDelete(id);

    return {
        success: true,
        message: "Notification deleted successfully",
    };
};

module.exports = {
    sendNotification,
    getUserNotifications,
    markNotificationAsRead,
    deleteNotification,
};