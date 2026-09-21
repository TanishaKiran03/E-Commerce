import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        axios
            .get("http://localhost:5000/api/orders", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                setOrders(response.data);
            })
            .catch((error) => {
                console.error(
                    "Error fetching orders:",
                    error
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, [token]);

    if (!token) {
        return (
            <main className="auth-page">
                <div className="message-card">
                    <h1>Please login</h1>

                    <p>
                        You need to login to view your orders.
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
                <h1>Loading orders...</h1>
            </main>
        );
    }

    return (
        <main className="orders-page">
            <div className="page-heading">
                <p className="section-label">
                    ORDER HISTORY
                </p>

                <h1>My Orders</h1>

                <p>
                    View your previous orders and their
                    details.
                </p>
            </div>

            {orders.length === 0 ? (
                <div className="message-card">
                    <h2>No orders yet</h2>

                    <p>
                        You haven't placed any orders yet.
                    </p>

                    <Link to="/products">
                        <button>Start Shopping</button>
                    </Link>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div
                            className="order-card"
                            key={order._id}
                        >
                            <div className="order-header">
                                <div>
                                    <p className="order-label">
                                        ORDER ID
                                    </p>

                                    <h2>{order._id}</h2>
                                </div>

                                <span className="order-status">
                                    {order.status}
                                </span>
                            </div>

                            <div className="order-details">
                                <p>
                                    <strong>
                                        Total Amount:
                                    </strong>{" "}
                                    ₹{order.totalAmount}
                                </p>

                                <p>
                                    <strong>
                                        Shipping Address:
                                    </strong>{" "}
                                    {order.shippingAddress}
                                </p>
                            </div>

                            <h3>Products</h3>

                            <div className="order-products">
                                {order.items.map((item) => (
                                    <div
                                        className="order-product"
                                        key={item._id}
                                    >
                                        <div>
                                            <strong>
                                                {
                                                    item
                                                        .product
                                                        .name
                                                }
                                            </strong>

                                            <p>
                                                Quantity:{" "}
                                                {
                                                    item.quantity
                                                }
                                            </p>
                                        </div>

                                        <strong>
                                            ₹
                                            {item.price *
                                                item.quantity}
                                        </strong>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}

export default Orders;