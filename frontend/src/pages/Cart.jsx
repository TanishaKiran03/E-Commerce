import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Cart() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    const fetchCart = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/cart",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCart(response.data);
        } catch (error) {
            console.error("Error fetching cart:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        fetchCart();
    }, [token]);

    const handleRemove = async (productId) => {
        try {
            const response = await axios.delete(
                `http://localhost:5000/api/cart/remove/${productId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setCart(response.data);

            alert("Product removed from cart!");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to remove product"
            );
        }
    };

    if (!token) {
        return (
            <main className="auth-page">
                <div className="message-card">
                    <h1>Please login</h1>

                    <p>
                        You need to login to view your cart.
                    </p>

                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
            </main>
        );
    }

    if (loading) {
        return (
            <main>
                <h1>Loading cart...</h1>
            </main>
        );
    }

    if (!cart) {
        return (
            <main>
                <h1>Unable to load cart.</h1>
            </main>
        );
    }

    const totalAmount = cart.items.reduce(
        (total, item) => {
            return (
                total +
                item.product.price * item.quantity
            );
        },
        0
    );

    return (
        <main className="cart-page">
            <div className="page-heading">
                <p className="section-label">YOUR SHOPPING BAG</p>

                <h1>My Cart</h1>
            </div>

            {cart.items.length === 0 ? (
                <div className="message-card">
                    <h2>Your cart is empty</h2>

                    <p>
                        Add some products to your cart to get
                        started.
                    </p>

                    <Link to="/products">
                        <button>Browse Products</button>
                    </Link>
                </div>
            ) : (
                <div className="cart-layout">
                    <div className="cart-items">
                        {cart.items.map((item) => (
                            <div
                                className="cart-item"
                                key={item._id}
                            >
                                <div className="cart-item-info">
                                    <h2>
                                        {item.product.name}
                                    </h2>

                                    <p>
                                        Price: ₹
                                        {item.product.price}
                                    </p>

                                    <p>
                                        Quantity:{" "}
                                        {item.quantity}
                                    </p>

                                    <p className="cart-subtotal">
                                        Subtotal: ₹
                                        {item.product.price *
                                            item.quantity}
                                    </p>
                                </div>

                                <button
                                    className="remove-button"
                                    onClick={() =>
                                        handleRemove(
                                            item.product._id
                                        )
                                    }
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h2>Order Summary</h2>

                        <div className="summary-row">
                            <span>Items</span>

                            <span>
                                {cart.items.length}
                            </span>
                        </div>

                        <div className="summary-row total-row">
                            <strong>Total</strong>

                            <strong>
                                ₹{totalAmount}
                            </strong>
                        </div>

                        <Link to="/checkout">
                            <button className="checkout-button">
                                Proceed to Checkout
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Cart;