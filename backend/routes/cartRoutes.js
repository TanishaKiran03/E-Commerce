const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ==================== GET CART ====================

router.get("/", protect, async (req, res) => {
    try {
        let cart = await Cart.findOne({
            user: req.userId
        }).populate("items.product");

        if (!cart) {
            cart = await Cart.create({
                user: req.userId,
                items: []
            });
        }

        res.status(200).json(cart);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});


// ==================== ADD TO CART ====================

router.post("/add", protect, async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        let cart = await Cart.findOne({
            user: req.userId
        });

        if (!cart) {
            cart = await Cart.create({
                user: req.userId,
                items: [
                    {
                        product: productId,
                        quantity: quantity || 1
                    }
                ]
            });

            return res.status(201).json({
                message: "Product added to cart",
                cart
            });
        }

        const existingItem = cart.items.find(
            item => item.product.toString() === productId
        );

        if (existingItem) {
            existingItem.quantity += quantity || 1;
        } else {
            cart.items.push({
                product: productId,
                quantity: quantity || 1
            });
        }

        await cart.save();

        res.status(200).json({
            message: "Product added to cart",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});


// ==================== REMOVE FROM CART ====================

router.delete("/remove/:productId", protect, async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.userId
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(
            item => item.product.toString() !== req.params.productId
        );

        await cart.save();

        res.status(200).json({
            message: "Product removed from cart",
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});


module.exports = router;