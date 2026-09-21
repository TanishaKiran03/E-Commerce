# E-Commerce Web Application

A full-stack e-commerce web application built using the MERN stack. The application provides a complete shopping workflow including user authentication, product browsing, cart management, checkout, and order tracking.

## Features

### User Features
- User registration and login
- JWT-based authentication
- Password hashing using bcrypt
- Browse available products
- View detailed product information
- Add products to cart
- Remove products from cart
- Checkout with shipping address
- Place orders
- View previous orders
- Logout functionality

### Admin Features
- Admin authentication and authorization
- Protected admin-only product creation
- Role-based access control

### Backend Features
- RESTful API architecture
- MongoDB database integration
- Mongoose data modeling
- JWT authentication middleware
- Protected API routes
- Product stock management
- Cart and order management

## Tech Stack

### Frontend
- React.js
- Vite
- React Router
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

## Project Structure

```text
E-Commerce/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   ├── Product.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   └── productRoutes.js
│   │
│   ├── .env
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
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
