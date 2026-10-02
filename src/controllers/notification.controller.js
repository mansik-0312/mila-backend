const notificationService = require("../services/notification.service");

const sendNotification = async (req, res) => {
    try {

        const result =
            await notificationService.sendNotification(req.body);

        return res.status(201).json({
            success: true,
            message: "Notification created successfully",
            data: result,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const getUserNotifications = async (req, res) => {
    try {

        const { page, limit } = req.query;

        const result =
            await notificationService.getUserNotifications(
                req.params.userId,
                page,
                limit
            );

        return res.status(200).json({
            success: true,
            data: result,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const markAsRead = async (req, res) => {

    try {

        const result =
            await notificationService.markNotificationAsRead(
                req.params.id
            );

        return res.status(200).json(result);

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

const deleteNotification = async (req, res) => {

    try {

        const result =
            await notificationService.deleteNotification(
                req.params.id
            );

        return res.status(200).json(result);

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    sendNotification,
    getUserNotifications,
    markAsRead,
    deleteNotification,
};