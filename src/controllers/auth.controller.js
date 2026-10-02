const health = async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Authentication service is running"
    });
};

const authService = require("../services/auth.service");

const register = async (req, res) => {
    try {
        const result = await authService.register(req.body);

        return res.status(result.statusCode).json(result);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    health,
    register,
};