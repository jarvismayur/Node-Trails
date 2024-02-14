const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register a new user
const register = async (req, res) => {
    
    const username  = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        

        // Create new user
        user = new User({
            username,
            email,
            password
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user to database
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Login user
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Update last login timestamp
        user.lastLogin = new Date();
        await user.save();

        // Create and send JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, 'jwtSecret', { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Send email verification
const sendVerificationEmail = async (req, res) => {
    const { email } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Generate verification token
        const token = jwt.sign({ userId: user._id }, 'verificationSecret', { expiresIn: '1d' });

        // Send verification email
        const transporter = nodemailer.createTransport({
            // Configuration for your email service provider
        });

        const mailOptions = {
            from: 'your-email@example.com',
            to: user.email,
            subject: 'Email Verification',
            text: `Please click on the following link to verify your email: http://localhost:3000/api/auth/verify/${token}`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Verification email sent successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Verify email
const verifyEmail = async (req, res) => {
    const { token } = req.params;

    try {
        const decoded = jwt.verify(token, 'verificationSecret');
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Invalid or expired token' });
    }
};

// Request password reset
const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Generate reset token
        const resetToken = jwt.sign({ userId: user._id }, 'resetSecret', { expiresIn: '1h' });
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();

        // Send password reset email
        const transporter = nodemailer.createTransport({
            // Configuration for your email service provider
        });

        const mailOptions = {
            from: 'your-email@example.com',
            to: user.email,
            subject: 'Password Reset',
            text: `Please click on the following link to reset your password: http://localhost:3000/reset-password/${resetToken}`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Password reset email sent successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Reset password
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getLastLogin = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ lastLogin: user.lastLogin });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { register, login, sendVerificationEmail, verifyEmail, requestPasswordReset, resetPassword, getLastLogin }
