# E-Commerce Web Application

A full-stack e-commerce web application built using the MERN stack. The application provides a complete shopping workflow including user authentication, product browsing, cart management, checkout, and order tracking.

## Features

### User Features

* User registration and login
* JWT-based authentication
* Password hashing using bcrypt
* Browse available products
* View detailed product information
* Add products to cart
* Remove products from cart
* Checkout with shipping address
* Place orders
* View previous orders
* Logout functionality

### Admin Features

* Admin authentication and authorization
* Protected admin-only product creation
* Role-based access control

### Backend Features

* RESTful API architecture
* MongoDB database integration
* Mongoose data modeling
* JWT authentication middleware
* Protected API routes
* Product stock management
* Cart and order management

## Tech Stack

### Frontend

* React.js
* Vite
* React Router
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* CORS
* dotenv

## Project Structure

```text
E-Commerce/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   └── productRoutes.js
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## Database Models

### User

* Name
* Email
* Hashed password
* Admin status

### Product

* Product name
* Description
* Price
* Image
* Category
* Stock

### Cart

* User
* Products
* Product quantities

### Order

* User
* Ordered products
* Quantity
* Product price
* Total amount
* Shipping address
* Order status

## API Endpoints

### Authentication

| Method | Endpoint             | Description                    |
| ------ | -------------------- | ------------------------------ |
| POST   | `/api/auth/register` | Register a new user            |
| POST   | `/api/auth/login`    | Login user                     |
| GET    | `/api/auth/profile`  | Get authenticated user profile |

### Products

| Method | Endpoint            | Description                   |
| ------ | ------------------- | ----------------------------- |
| GET    | `/api/products`     | Get all products              |
| GET    | `/api/products/:id` | Get a single product          |
| POST   | `/api/products`     | Create a product (Admin only) |

### Cart

| Method | Endpoint                      | Description              |
| ------ | ----------------------------- | ------------------------ |
| GET    | `/api/cart`                   | Get current user's cart  |
| POST   | `/api/cart/add`               | Add a product to cart    |
| DELETE | `/api/cart/remove/:productId` | Remove product from cart |

### Orders

| Method | Endpoint             | Description               |
| ------ | -------------------- | ------------------------- |
| POST   | `/api/orders/create` | Create an order           |
| GET    | `/api/orders`        | Get current user's orders |

## Authentication

The application uses JSON Web Tokens (JWT) for authentication. Passwords are securely hashed using `bcryptjs` before being stored in MongoDB.

## Environment Variables

Create a `.env` file inside the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
```

The `.env` file is excluded from Git using `.gitignore`.

## Installation

### Clone the Repository

```bash
git clone https://github.com/TanishaKiran03/E-Commerce.git
cd E-Commerce
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### Frontend Setup

Open another terminal:

```bash
cd E-Commerce/frontend
npm install
npm run dev
```

The frontend runs on the Vite development URL, usually:

```text
http://localhost:5173
```

## Application Flow

```text
Register / Login
       ↓
Browse Products
       ↓
View Product Details
       ↓
Add to Cart
       ↓
Checkout
       ↓
Place Order
       ↓
View Orders
       ↓
MongoDB
```

## Security

* Password hashing using bcrypt
* JWT-based authentication
* Protected API routes
* Admin authorization
* Environment variables for sensitive configuration
* Mongoose schema validation

## Future Improvements

* Payment gateway integration
* Product search and filtering
* Product reviews and ratings
* Admin dashboard
* Order status management
* Pagination
* Cloud deployment

## Author

**Tanisha Kiran**

Computer Science & Engineering Student

GitHub: [TanishaKiran03](https://github.com/TanishaKiran03)
