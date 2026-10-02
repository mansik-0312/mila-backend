const express = require("express");

const authRoutes = require("./auth.routes");
const notificationRoutes = require("./notification.routes");
const likeRoutes = require("./like.routes");

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/notifications", notificationRoutes);

router.use("/likes", likeRoutes);

module.exports = router;