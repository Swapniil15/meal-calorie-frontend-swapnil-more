# 🌐 Meal Calorie Tracker – Frontend

This is the **frontend** of the Meal Calorie Tracker app built with React. It connects with the backend API to provide a seamless user experience for:

* 🔐 Authentication
* 🍽️ Entering and tracking meals
* 📊 Viewing calorie/nutrient information
* 💬 Submitting feedback

---

## 💠 Tech Stack

* **React** + **TypeScript**
* **React Router**
* **Zustand** (state management)
* **Tailwind CSS**
* **React Icons** + **Toastify**
* **Axios** (API requests)

---

## 📁 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Swapniil15/meal-calorie-frontend.git
cd meal-calorie-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the App

```bash
npm start
```

The frontend app will start on: [http://localhost:3000](http://localhost:3000)

> ✅ Make sure the backend is running at [http://localhost:8000](http://localhost:8000)

---

## ⚙️ Features

* 🔐 **User Login & Registration** with JWT
* 📥 **Protected Routes** for calorie tracking
* 🍲 **Meal input form** to get calories using USDA API
* 💬 **Feedback system** (per user and per dish)
* 🌗 **Dark Mode Toggle**
* 🔄 **Persisted user state** via Zustand

---

## 🛣️ Pages & Routes

| Route       | Description            |
| ----------- | ---------------------- |
| `/login`    | User login page        |
| `/register` | User registration page |
| `/calories` | Add and track meals    |
| `/feedback` | Submit dish feedback   |

> 🚫 Protected routes require a valid token in Zustand/localStorage.

---

## 🧠 State Management

Zustand is used to:

* Store and persist user token and info
* Optionally cache previous meal data

---

## 📬 Contact

For issues or feedback, raise an issue on GitHub or contact the maintainer.

---
