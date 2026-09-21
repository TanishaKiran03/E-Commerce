import { Link } from "react-router-dom";

function Home() {
    return (
        <main className="home-page">
            <section className="hero-section">
                <div className="hero-content">
                    <p className="hero-label">
                        WELCOME TO OUR STORE
                    </p>

                    <h1>
                        Everything You Need,
                        <br />
                        All in One Place
                    </h1>

                    <p className="hero-text">
                        Discover quality products at affordable
                        prices and enjoy a simple shopping
                        experience.
                    </p>

                    <Link to="/products">
                        <button className="hero-button">
                            Shop Now
                        </button>
                    </Link>
                </div>
            </section>

            <section className="home-features">
                <div className="feature-card">
                    <h3>Quality Products</h3>
                    <p>
                        Carefully selected products for your
                        everyday needs.
                    </p>
                </div>

                <div className="feature-card">
                    <h3>Affordable Prices</h3>
                    <p>
                        Great products at prices that fit your
                        budget.
                    </p>
                </div>

                <div className="feature-card">
                    <h3>Easy Shopping</h3>
                    <p>
                        Browse, add to cart and place your order
                        with ease.
                    </p>
                </div>
            </section>
        </main>
    );
}

export default Home;