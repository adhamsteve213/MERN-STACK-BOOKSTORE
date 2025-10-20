import express from "express";
import Order from "../models/Order.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Create a new order (checkout)
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { products, total, address, phone, Firstname, Lastname, Middlename } = req.body;
        const userId = req.user.id; // From auth middleware

        const newOrder = new Order({
            user: userId,
            products,
            total,
            address,
            phone,
            Firstname,
            Lastname,
            Middlename,
        });

        await newOrder.save();
        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
