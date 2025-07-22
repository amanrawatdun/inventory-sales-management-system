# 🛒 Inventory & Sales Management System

A full-stack MERN (MongoDB, Express.js, React, Node.js) application designed to help small businesses manage products, track sales, monitor profit/loss, and maintain admin access control with OTP-secured login.

---

## 🚀 Live Demo

- 🔗 Frontend: [https://inventory-pro-qdxu.onrender.com](https://inventory-pro-qdxu.onrender.com)
- 🔗 Backend: [https://inventory-backend-c7pb.onrender.com/api](https://inventory-backend-c7pb.onrender.com/api)

---

## 📦 Features

### 👤 Admin Authentication
- Admin registration/login with JWT token
- OTP verification for password reset
- Profile update

### 📦 Inventory Module
- Create, read, update, delete (CRUD) products
- Upload product images (stored via Cloudinary)
- Track low-stock or out-of-stock items

### 💸 Sales Module
- Create and view sales with date filtering
- Automatically reduce stock upon sale
- Track profit and revenue per sale

### 📊 Dashboard
- Total products, total sales, revenue, profit
- Top-selling products
- Low stock & out-of-stock alerts

---

## ⚙️ Technologies Used

### Frontend:
- React + Redux Toolkit
- Axios for API calls
- React Router

### Backend:
- Node.js + Express.js
- MongoDB + Mongoose
- JWT & bcrypt for auth
- Cloudinary for image hosting
- CORS & cookie-parser for secure access

---

## 🛠️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/inventory-sales-management-system.git
cd inventory-sales-management-system
