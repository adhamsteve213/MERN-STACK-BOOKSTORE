import express from 'express';
import Wishlist from '../models/wishlist.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get a user's wishlist
router.get("/:userId", authMiddleware, async (req, res) => {
    try {
        const userWishlist = await Wishlist.findOne({ user: req.params.userId }).populate('products.product');
        if (!userWishlist) {
            // It's okay if a user doesn't have a wishlist yet, return an empty one.
            return res.status(200).json({ user: req.params.userId, products: [] });
        }
        res.status(200).json(userWishlist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Add a product to the wishlist
router.post("/add", authMiddleware, async (req, res) => {
    try {
        const { userId, productId } = req.body;
        let userWishlist = await Wishlist.findOne({ user: userId });

        if (!userWishlist) {
            // If no wishlist exists for the user, create a new one
            userWishlist = new Wishlist({
                user: userId,
                products: [{ product: productId }],
            });
            await userWishlist.save();
            return res.status(201).json({ message: "Product added to new wishlist successfully" });
        }

        // If wishlist exists, check if the product is already in it
        const productExists = userWishlist.products.some(item => item.product.equals(productId));
        if (productExists) {
            return res.status(409).json({ message: "Product already in wishlist" });
        }

        // Add product to the existing wishlist
        userWishlist.products.push({ product: productId });
        await userWishlist.save();
        res.status(200).json({ message: "Product added to wishlist successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Remove a product from the wishlist
router.delete("/remove", authMiddleware, async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const result = await Wishlist.updateOne({ user: userId }, { $pull: { products: { product: productId } } });
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Product not found in wishlist or wishlist does not exist" });
        }
        res.status(200).json({ message: "Product removed from wishlist successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
