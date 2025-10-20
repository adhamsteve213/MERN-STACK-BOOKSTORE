import express from "express";
import Cart from "../models/cart.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Get user's cart
router.get("/:userId", authMiddleware, async (req, res) => {
    try {
        const userCart = await Cart.findOne({ user: req.params.userId }).populate('products.product');
        if (!userCart) {
            return res.status(200).json({ user: req.params.userId, products: [] });
        }
        res.status(200).json(userCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Add product to cart
router.post("/add", authMiddleware, async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        let userCart = await Cart.findOne({ user: userId });

        if (!userCart) {
            userCart = new Cart({
                user: userId,
                products: [{ product: productId, quantity }],
            });
            await userCart.save();
            return res.status(201).json({ message: "Cart created successfully" });
        }

        const productIndex = userCart.products.findIndex(item => item.product.equals(productId));
        if (productIndex > -1) {
            userCart.products[productIndex].quantity += quantity;
        } else {
            userCart.products.push({ product: productId, quantity });
        }
        await userCart.save();
        res.status(200).json({ message: "Product added to cart successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Increase quantity
router.put("/increase", authMiddleware, async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const result = await Cart.updateOne(
            { user: userId, "products.product": productId },
            { $inc: { "products.$.quantity": 1 } }
        );
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Product not found in cart" });
        }
        res.status(200).json({ message: "Quantity increased successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Decrease quantity
router.put("/decrease", authMiddleware, async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const productIndex = cart.products.findIndex(item => item.product.equals(productId));
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not found in cart" });
        }
        if (cart.products[productIndex].quantity > 1) {
            cart.products[productIndex].quantity -= 1;
            await cart.save();
        } else {
            cart.products.splice(productIndex, 1);
            await cart.save();
        }
        res.status(200).json({ message: "Quantity decreased successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Remove product from cart
router.delete("/remove", authMiddleware, async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const result = await Cart.updateOne({ user: userId }, { $pull: { products: { product: productId } } });
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Product not found in cart or cart does not exist" });
        }
        res.status(200).json({ message: "Product removed from cart successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
