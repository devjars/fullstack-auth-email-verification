# 🔐 Fullstack Auth System with Email Verification

A simple and secure full-stack authentication system with email verification built using **React**, **Express**, **JWT**, and **MySQL**.

---

## 🚀 Features

- ✅ User registration with email and password
- 🔒 JWT-based authentication using HTTP-only cookies
- 📧 Email verification with 6-digit code
- 🛡️ Protected routes (frontend)
- 🧪 Input validation with middleware (joi)

---

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- TailwindCSS (with shadcn/ui)

**Backend:**
  Express.js
- MySQL
- JWT
- Nodemailer (for sending verification codes)

**Authentication:**
- JWT stored in cookies (`httpOnly`, `sameSite`)

---

## 🧾 Database Schema (MySQL)

CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  code VARCHAR(6),
  code_expiry TIMESTAMP,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

