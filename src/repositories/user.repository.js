const User = require("../models/User");

const findByEmail = async (email) => {
    return await User.findOne({ email });
};

const findByUsername = async (username) => {
    return await User.findOne({ username });
};

const createUser = async (userData) => {
    return await User.create(userData);
};

module.exports = {
    findByEmail,
    findByUsername,
    createUser,
};