import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");

        alert("Logged out successfully!");

        navigate("/login");
    };

    return (
        <nav>
            <h2>E-Commerce Store</h2>

            <div>
                <Link to="/">
                    <button>Home</button>
                </Link>

                <Link to="/products">
                    <button>Products</button>
                </Link>

                {!token && (
                    <>
                        <Link to="/login">
                            <button>Login</button>
                        </Link>

                        <Link to="/register">
                            <button>Register</button>
                        </Link>
                    </>
                )}

                <Link to="/cart">
                    <button>Cart</button>
                </Link>

                <Link to="/orders">
                    <button>Orders</button>
                </Link>

                {token && (
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;