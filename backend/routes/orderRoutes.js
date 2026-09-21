const express = require("express");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ==================== CREATE ORDER ====================

router.post("/create", protect, async (req, res) => {
    try {
        const { shippingAddress } = req.body;

        const cart = await Cart.findOne({
            user: req.userId
        }).populate("items.product");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        const orderItems = cart.items.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price
        }));

        const totalAmount = cart.items.reduce(
            (total, item) => {
                return total + item.product.price * item.quantity;
            },
            0
        );

        const order = await Order.create({
            user: req.userId,
            items: orderItems,
            totalAmount,
            shippingAddress
        });

        // Reduce product stock
        for (const item of cart.items) {
            await Product.findByIdAndUpdate(
                item.product._id,
                {
                    $inc: {
                        stock: -item.quantity
                    }
                }
            );
        }

        // Empty the cart
        cart.items = [];
        await cart.save();

        res.status(201).json({
            message: "Order created successfully",
            order
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});


// ==================== GET MY ORDERS ====================

router.get("/", protect, async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.userId
        }).populate("items.product");

        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});


module.exports = router;