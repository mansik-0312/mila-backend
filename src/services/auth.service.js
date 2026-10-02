const userRepository = require("../repositories/user.repository");
const redisService = require("./redis.service");
const { sendMail } = require("./mail.service");
const { signupTemplate } = require("../templates/signup.template");
const { hashPassword } = require("../utils/bcrypt");
const { generateOTP } = require("../utils/otp");

const register = async (userData) => {

    const existingEmail = await userRepository.findByEmail(userData.email);

    if (existingEmail) {
        return {
            success: false,
            statusCode: 400,
            message: "Email already registered",
        };
    }

    const existingUsername = await userRepository.findByUsername(
        userData.username
    );

    if (existingUsername) {
        return {
            success: false,
            statusCode: 400,
            message: "Username already taken",
        };
    }

    const hashedPassword = await hashPassword(userData.password);

    const otp = generateOTP();

    const signupData = {
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
    };

    await redisService.set(
        `signup:${userData.email}:data`,
        signupData,
        600
    );

    await redisService.set(
        `signup:${userData.email}:otp`,
        otp,
        60
    );

    const html = signupTemplate({
        username: userData.username,
        otp,
    });

    try {
        await sendMail({
            to: userData.email,
            subject: "Verify your email - MILA",
            html,
        });
    } catch (error) {
        // cleanup if needed
        throw new Error("Failed to send verification email.");
    }

    return {
        success: true,
        statusCode: 200,
        message: "OTP sent successfully",
    };
};

module.exports = {
    register,
};