# 🛒 E-Commerce Web Application

A modern and responsive **E-Commerce Web Application** built with **React.js**. The project provides a clean shopping experience with product browsing, search, category filtering, sorting, product details, and cart management.

The project is being developed as a **MERN Stack application**, with the frontend being developed first and the Node.js, Express.js, and MongoDB backend planned as the next phase.

---

## 🚀 Features

### 🏠 Home Page

* Modern landing page
* Store branding and hero section
* Shop Now navigation
* Category section
* Featured products
* Store benefits section

### 🛍️ Products

* Fetch products from API
* Product grid layout
* Search products by name
* Filter products by category
* Sort products by:

  * Price: Low to High
  * Price: High to Low
  * Rating: High to Low
  * Name: A-Z

### 📦 Product Details

* Product image
* Product title
* Brand
* Category
* Description
* Rating
* Price
* Add to Cart functionality

### 🛒 Shopping Cart

* Add products to cart
* Increase product quantity
* Decrease product quantity
* Automatically remove product when quantity reaches zero
* Remove individual products
* Clear entire cart
* Calculate subtotal
* Calculate total cart items
* Responsive cart layout

### 🔐 Authentication UI

* Login page
* Registration page
* Minimal split-screen authentication design
* Login/Register navigation
* Authentication UI prepared for backend integration

> Authentication functionality will be implemented after the Node.js, Express.js, and MongoDB backend is developed.

### 📱 Responsive Design

The application is designed to work across:

* Desktop
* Tablet
* Mobile

---

## 🛠️ Technologies Used

### Frontend

* **React.js**
* **JavaScript (ES6+)**
* **HTML5**
* **CSS3**
* **React Router**
* **Context API**
* **Vite**

### API

Currently using:

* **DummyJSON API**

The API is used to retrieve product information during frontend development.

### Planned Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**

---

## 📂 Project Structure

```text
FrontEnd/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── CategoryFilter/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── Loader/
│   │   ├── ProductCard/
│   │   └── SearchBar/
│   │
│   ├── context/
│   │   └── CartContext.jsx
│   │
│   ├── pages/
│   │   ├── Cart/
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── ProductDetails/
│   │   ├── Products/
│   │   └── Register/
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

---

## 🧩 Application Architecture

The frontend follows a component-based architecture.

```text
React Application
│
├── Components
│   ├── Header
│   ├── Footer
│   ├── ProductCard
│   ├── SearchBar
│   ├── CategoryFilter
│   └── Loader
│
├── Pages
│   ├── Home
│   ├── Products
│   ├── Product Details
│   ├── Cart
│   ├── Login
│   └── Register
│
├── Context
│   └── Cart Context
│
└── Services
    └── API Service
```

---

## 🛒 Cart Management

The application uses **React Context API** for centralized cart state management.

The cart context handles:

```text
Add Product
     ↓
Increase Quantity
     ↓
Decrease Quantity
     ↓
Remove Product
     ↓
Clear Cart
     ↓
Calculate Subtotal
     ↓
Calculate Cart Count
```

Product cards also display quantity controls once a product has been added:

```text
Before adding:

[ Add to Cart ]


After adding:

[ − ]  1  [ + ]


After increasing:

[ − ]  2  [ + ]


After decreasing to zero:

[ Add to Cart ]
```

---

## 🔗 Routing

The application uses **React Router**.

Current routes:

| Route           | Page            |
| --------------- | --------------- |
| `/`             | Home            |
| `/products`     | Products        |
| `/products/:id` | Product Details |
| `/cart`         | Cart            |
| `/login`        | Login           |
| `/register`     | Register        |

---

## 🔌 API Service

API requests are centralized inside:

```text
src/services/api.js
```

Currently available services:

```javascript
getProducts()
getProductById(id)
getCategories()
```

The frontend currently uses the DummyJSON products API for development.

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the project

```bash
cd FrontEnd
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local development URL provided by Vite.

---

## 📸 Application Pages

### Home

The home page provides:

* Store introduction
* Featured products
* Categories
* Shopping benefits

### Products

Users can:

* Search products
* Filter by category
* Sort products
* Open product details
* Add products to cart

### Product Details

Users can view detailed product information and add products directly to the cart.

### Cart

Users can:

* View cart items
* Change quantities
* Remove products
* Clear the cart
* View subtotal and total

### Authentication

Login and registration pages provide the UI required for future authentication integration.

---

## 🔮 Future Improvements

The next phase of the project will introduce the complete MERN backend.

### Backend

* [ ] Node.js server
* [ ] Express.js API
* [ ] MongoDB database
* [ ] Mongoose models
* [ ] Product APIs
* [ ] User APIs
* [ ] Cart APIs
* [ ] Order APIs

### Authentication & Authorization

* [ ] User registration
* [ ] User login
* [ ] Password hashing
* [ ] JWT authentication
* [ ] Protected routes
* [ ] Logout
* [ ] User authorization

### E-Commerce Features

* [ ] Checkout
* [ ] Orders
* [ ] Order history
* [ ] User profile
* [ ] Product management
* [ ] Admin dashboard
* [ ] Payment integration

### UI Improvements

* [ ] Form validation
* [ ] Authentication error messages
* [ ] Loading states
* [ ] Toast notifications
* [ ] Improved accessibility
* [ ] Dark mode

---

## 📌 Current Development Status

```text
Frontend
████████████████████  Completed

Backend
░░░░░░░░░░░░░░░░░░░░  Planned

Authentication
████████████░░░░░░░░  UI Completed
                      Backend Integration Pending

Database
░░░░░░░░░░░░░░░░░░░░  Planned
```

### Current Focus

The frontend is currently being completed and tested before starting the backend development.

The planned development order is:

```text
React Frontend
      ↓
Frontend Testing
      ↓
Node.js
      ↓
Express.js
      ↓
MongoDB
      ↓
Backend APIs
      ↓
Authentication
      ↓
Frontend + Backend Integration
      ↓
Complete MERN E-Commerce Application
```

---

## 👨‍💻 Author

**Santhosh Kumar**

B.Tech – Computer Science and Engineering
Specialization: Artificial Intelligence & Data Science

### Connect with me

* GitHub: `Santhoshmarkonda`
* LinkedIn: `Santhosh-kumar-Markonda`
* LeetCode: `santhosh_2305`

---

## ⭐ If you like this project

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.
