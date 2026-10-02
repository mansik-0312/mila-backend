const express = require("express");

const router = express.Router();

const validate = require("../middleware/validation.middleware");

const notificationController =
    require("../controllers/notification.controller");

const {
    createNotificationSchema,
} = require("../validators/notification.validator");

router.post(
    "/",
    validate(createNotificationSchema),
    notificationController.sendNotification
);

router.get(
    "/:userId",
    notificationController.getUserNotifications
);

router.patch(
    "/:id/read",
    notificationController.markAsRead
);

router.delete(
    "/:id",
    notificationController.deleteNotification
);

module.exports = router;