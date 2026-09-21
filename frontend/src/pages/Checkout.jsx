import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Checkout() {
    const [shippingAddress, setShippingAddress] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        if (!shippingAddress.trim()) {
            alert("Please enter your shipping address.");
            return;
        }

        setLoading(true);

        try {
            await axios.post(
                "http://localhost:5000/api/orders/create",
                {
                    shippingAddress: shippingAddress.trim()
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Order placed successfully!");

            navigate("/orders");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to place order"
            );
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <main className="auth-page">
                <div className="message-card">
                    <h1>Please login first</h1>

                    <p>
                        You need to login before placing an
                        order.
                    </p>

                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="checkout-page">
            <div className="checkout-card">
                <div className="page-heading">
                    <p className="section-label">
                        COMPLETE YOUR ORDER
                    </p>

                    <h1>Checkout</h1>

                    <p>
                        Enter your shipping details to place
                        your order.
                    </p>
                </div>

                <form onSubmit={handlePlaceOrder}>
                    <div className="form-group">
                        <label>
                            Shipping Address
                        </label>

                        <textarea
                            value={shippingAddress}
                            onChange={(e) =>
                                setShippingAddress(
                                    e.target.value
                                )
                            }
                            placeholder="Enter your complete shipping address"
                            rows="6"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="checkout-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Placing Order..."
                            : "Place Order"}
                    </button>
                </form>
            </div>
        </main>
    );
}

export default Checkout;