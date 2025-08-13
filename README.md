
# 🚀 **NextGenGadgets**

A full-stack web application built with **Next.js** (client) and **Express.js** (server).

---

## 📋 Table of Contents
1. [About](#-about)
2. [Tech Stack](#-tech-stack)
3. [Folder Structure](#-folder-structure)
4. [Prerequisites](#-prerequisites)
5. [Installation](#-installation)
6.  [Environment Variables](#-environment-variables)
7. [Running the Project](#-running-the-project)
8. [API Documentation](#-api-documentation)

---

## 📖 About
This project consists of:
- **Frontend** built with Next.js for rendering UI and managing client-side interactions.
- **Backend** built with Express.js for REST API services.

---

## 🛠 Tech Stack
**Frontend:**
- Next.js
- React
- Tailwind CSS & ShadCN UI

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose

---

## 📂 Folder Structure
project-root/  
├── client/ # Next.js frontend  
├── server/ # Express.js backend  
└── README.md
___


## ✅ Prerequisites
Make sure you have installed:
- **Node.js** (v18+ recommended) → https://nodejs.org
- **npm** or **yarn**
- **MongoDB** (if using locally) → https://www.mongodb.com/try/download/community  
  _(Skip if using a cloud DB like MongoDB Atlas)_

---

## 📥 Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/NifatHossain/next_gen_gadgets_client.git
cd next_gen_gadgets_client
```

### 2️⃣ Install dependencies
**Frontend**
```bash
cd client
npm install
```
**Backend**
```bash
cd server
npm install
```
___

## 🔑 Environment Variables

**Frontend (`client/.env.local`)**
``` 
NEXT_PUBLIC_API_URL=http://localhost:3002

NEXTAUTH_URL=http://localhost:3000

NEXTAUTH_SECRET=cse327ProjectSecret
```
**Backend (`server/.env`)**
``` 
PORT=3002
# Database
DATABASE_URI=mongodb+srv://rakib:1234@cluster0.zaide64.mongodb.net/cse327Project
# Used to encrypt JWT token
AUTH_SECRET=cse327ProjectSecret
# Used for generating hash
SALT_ROUND=10
```
___
## ▶️ Running the Project
**1. Start the Backend (Express.js)**
```bash
cd server
npm run dev
```
>_Server will run on_ **[http://localhost:3002](http://localhost:3002)**

**2. Start the Frontend (Next.js)**
```bash
cd client
npm run dev
```
> _Client will run on_ **[http://localhost:3000](http://localhost:3000)**
___
## 📜 API Documentation
> Swagger UI: **[http://localhost:3002/docs](http://localhost:3002/api-docs)**
