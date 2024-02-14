const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: String,
    created_at: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false }, // New field for email verification
    resetToken: String, // New field for password reset token
    resetTokenExpiration: Date // New field for password reset token expiration
    lastLogin: Date 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
