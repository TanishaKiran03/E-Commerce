import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import headphonesImage from "../assets/products/headphones.jpg";

function ProductDetails() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/products/${id}`)
            .then((response) => {
                setProduct(response.data);
            })
            .catch((error) => {
                console.error(
                    "Error fetching product:",
                    error
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    const handleAddToCart = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first.");
            return;
        }

        if (quantity < 1) {
            alert("Quantity must be at least 1.");
            return;
        }

        if (quantity > product.stock) {
            alert("Not enough stock available.");
            return;
        }

        try {
            await axios.post(
                "http://localhost:5000/api/cart/add",
                {
                    productId: product._id,
                    quantity: quantity
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Product added to cart!");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to add product to cart"
            );
        }
    };

    if (loading) {
        return (
            <main>
                <h1>Loading product...</h1>
            </main>
        );
    }

    if (!product) {
        return (
            <main>
                <h1>Product not found</h1>

                <Link to="/products">
                    <button>Back to Products</button>
                </Link>
            </main>
        );
    }

    const productImage =
        product.name === "Wireless Headphones"
            ? headphonesImage
            : product.image;

    return (
        <main>
            <div className="product-details">
                <Link to="/products">
                    <button className="back-button">
                        ← Back to Products
                    </button>
                </Link>

                <div className="product-details-content">
                    <div className="product-details-image">
                        <img
                            src={productImage}
                            alt={product.name}
                        />
                    </div>

                    <div className="product-details-info">
                        <p className="product-category">
                            {product.category}
                        </p>

                        <h1>{product.name}</h1>

                        <p className="product-details-description">
                            {product.description}
                        </p>

                        <h2 className="product-details-price">
                            ₹{product.price}
                        </h2>

                        <p>
                            <strong>Available Stock:</strong>{" "}
                            {product.stock}
                        </p>

                        <div className="quantity-section">
                            <label>
                                Quantity:
                            </label>

                            <input
                                type="number"
                                min="1"
                                max={product.stock}
                                value={quantity}
                                onChange={(e) =>
                                    setQuantity(
                                        Number(e.target.value)
                                    )
                                }
                            />
                        </div>

                        <button
                            className="add-cart-button"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ProductDetails;