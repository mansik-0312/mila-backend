const express = require("express");

const router = express.Router();

const likeController = require("../controllers/like.controller");
const validate =
    require("../middleware/validation.middleware");

const {
    likeUserSchema,
} = require("../validators/like.validation");

router.post(
    "/",
    validate(likeUserSchema),
    likeController.likeUser
);

module.exports = router;