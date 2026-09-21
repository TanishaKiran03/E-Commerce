import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import headphonesImage from "../assets/products/headphones.jpg";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/products")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error(
                    "Error fetching products:",
                    error
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleAddToCart = async (productId) => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login first.");
            return;
        }

        try {
            await axios.post(
                "http://localhost:5000/api/cart/add",
                {
                    productId: productId,
                    quantity: 1
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
                <h1>Loading products...</h1>
            </main>
        );
    }

    return (
        <main className="products-page">
            <div className="page-heading">
                <p className="section-label">
                    OUR COLLECTION
                </p>

                <h1>Products</h1>

                <p>
                    Browse our collection and find something
                    you'll love.
                </p>
            </div>

            {products.length === 0 ? (
                <div className="empty-state">
                    <h2>No products available</h2>

                    <p>
                        There are currently no products in the
                        store.
                    </p>
                </div>
            ) : (
                <div className="product-grid">
                    {products.map((product) => {
                        const productImage =
                            product.name === "Wireless Headphones"
                                ? headphonesImage
                                : product.image;

                        return (
                            <div
                                className="product-card"
                                key={product._id}
                            >
                                <Link
                                    to={`/products/${product._id}`}
                                >
                                    <img
                                        src={productImage}
                                        alt={product.name}
                                    />
                                </Link>

                                <div className="product-card-content">
                                    <p className="product-category">
                                        {product.category}
                                    </p>

                                    <Link
                                        to={`/products/${product._id}`}
                                    >
                                        <h2>{product.name}</h2>
                                    </Link>

                                    <p className="product-description">
                                        {product.description}
                                    </p>

                                    <div className="product-bottom">
                                        <strong>
                                            ₹{product.price}
                                        </strong>

                                        <span>
                                            {product.stock} left
                                        </span>
                                    </div>

                                    <button
                                        onClick={() =>
                                            handleAddToCart(
                                                product._id
                                            )
                                        }
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </main>
    );
}

export default Products;