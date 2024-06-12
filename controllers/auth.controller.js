import db from '../models/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendEmail } from '../utils/email.js';

const User = db.user;

// register a new user
export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });
        // User registeredsuccessfully registered
        res.status(201).send({ message: "Registered successfully!", user });
    } catch (error) {
        // Failed to register
        res.status(500).send({ message: error.message });
    }
};

// login with password and username
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        // Find user
        if (!user) {
            // Account not found 
            return res.status(404).send({ message: "Account not found." });
        }
        // Compare password
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({ accessToken: null, message: "Invalid password!" });
        }
        // Create token
        const token = jwt.sign({ id: user.id }, "SECRET", {
            expiresIn: 86400 // token  24 hours
        });
        // Logged in successfully
        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            accessToken: token
        });
    } catch (error) {
        // Fail
        res.status(500).send({ message: error.message });
    }
};

// Forgot password
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });

        // User not found
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        // Save reset token to database
        await user.save();

        const resetLink = `http://localhost:9999/reset-password/${token}`;
        await sendEmail(user.email, 'Password Reset', `Click to reset your password: ${resetLink}`);

        // Email sent successfully
        res.status(200).send({ message: "Password reset link sent to email." });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Reset password
export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        // Find reset token from database
        const user = await User.findOne({ where: {
            resetPasswordToken: token,
            resetPasswordExpires: { [db.Sequelize.Op.gt]: Date.now() }
        } });

        // Token not found
        if (!user) {
            return res.status(400).send({ message: "Invalid or expired reset token." });
        }

        // Encode new password
        user.password = await bcrypt.hash(password, 8);
        // Delete reset token
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        res.status(200).send({ message: "Password updated successfully." });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};