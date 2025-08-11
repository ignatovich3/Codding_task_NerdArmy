
# 🌸 **Codding\_task\_NerdArmy — Flower Inventory Management**

A complete system for managing flower inventory, built in a **full-stack** architecture:

* 💻 **Web Frontend** – React
* 📱 **Mobile App** – React Native + Expo
* ⚙️ **Backend** – FastAPI + PostgreSQL

---

## 🧱 **Repository Structure**

```
project-root/
│
├── backend/         # FastAPI backend + PostgreSQL database
├── frontend/        # React web application
├── mobile_app/      # React Native mobile application (Expo)
└── mockups/         # HTML screen mockups
```

---

## 🛠️ **Technologies**

| Layer    | Technology Stack                               |
| -------- | ---------------------------------------------- |
| Backend  | FastAPI, PostgreSQL, SQLAlchemy, JWT, Pydantic |
| Frontend | React, React Router, Axios                     |
| Mobile   | React Native, Expo, Axios, React Navigation    |

---

## ⚙️ **Backend (FastAPI + PostgreSQL)**

### 📁 **Structure**

```
backend/
├── main.py               # Main entry point for the app
├── models.py             # SQLAlchemy models
├── schemas.py            # Pydantic schemas
├── crud.py               # Business logic
├── auth.py               # Authentication and JWT
├── database.py           # Database connection configuration
├── requirements.txt      # Pip dependencies
├── .env                  # Environment variables (e.g., DB URL, JWT_SECRET)
```

---

## 🧩 **How to Set Up PostgreSQL Locally**

To run the application with a working PostgreSQL database locally, follow these steps:

### ✅ 1. Install PostgreSQL

* Download and install PostgreSQL: [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
* During installation:

  * Save the username (e.g., `postgres`)
  * Save the password (e.g., `admin`)
  * Recommended: Install **pgAdmin** (a graphical tool for managing the database)

---

### ✅ 2. Create a Database

#### Through terminal (psql)

```bash
psql -U postgres
CREATE DATABASE flowers_db;
```

---

### ✅ 3. Configure the `.env` File (in the `backend/` folder)

Create a `.env` file (if not present) and insert:

```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/flowers_db
```

> Make sure the password and connection data match what you set during PostgreSQL installation.

---

### ✅ 4. Run the Backend

Install dependencies and run the backend locally:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

For the mobile app, run the backend at a network-accessible address:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

---

### 🧪 **6. Test Connection**

* Open your browser and go to: [http://localhost:8000/docs](http://localhost:8000/docs)
* You can test all available API endpoints there.

---

🔐 **Authentication**

* JWT Token (header: `Authorization: Bearer <token>`)
* Token generated upon login (endpoint: `/login`)

### 📚 **Swagger Documentation**

* Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
* ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## 🌐 **Web Frontend (React)**

### 📁 **Structure**

```
frontend/
├── src/
│   ├── components/      # UI Components
│   ├── App.js           # Routers + Layout
│   ├── api.js           # HTTP connections (Axios)
│   └── styles.css
├── public/
├── package.json
```

### ▶️ **Running the Frontend**

```bash
cd frontend
npm install
npm start
```

Available at: [http://localhost:3000](http://localhost:3000)

---

## 📱 **Mobile Application (React Native + Expo)**

### 📁 **Structure**

```
mobile_app/
├── app/                 # App Screens
├── components/          # Reusable Components
├── utils/               # Configurations (e.g., API)
├── app.json             # Expo configuration
├── expo-env.d.ts
```

---

## 🌐 **Configure IP Address in the Mobile App (`utils/api.js`)**

For the mobile app to communicate with the locally running backend, you need to configure the correct IP address of your computer in the `api.js` file.

> 🔁 Default code looks like this:

```js
// utils/api.js
const API_URL = 'http://192.168.100.3:8000';
```

### ✅ **How to Set Your Own IP Address?**

1. **Open terminal (Windows)** and type:

```bash
ipconfig
```

2. Look for your local IP address (e.g., `192.168.0.15`) — usually under `IPv4 Address`.
3. Copy this address and replace `192.168.100.3` with it:

```js
const API_URL = 'http://192.168.0.15:8000';
```

4. Ensure the backend is running with the `--host 0.0.0.0` flag:

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

---

### ▶️ **Running the Mobile App**

1. Install **Expo CLI** (if you don’t have it):

```bash
npm install -g expo-cli
```

2. Run the app:

```bash
cd mobile_app
npm install
npx expo start
```

3. Scan the QR code with the **Expo Go** app on your phone.

---

## 📷 **Mockups / Prototypes**

Available in the `mockups/` folder as HTML files. You can open them in a browser and click through the app screens.

---

## 🧠 **Database Architecture**

* **Users Table**: id, username, email, hashed\_password
* **Flowers Table**: id, name, description, category, quantity, status, user\_id (FK)

---

## ✅ **Features**

| Feature               | Web | Mobile |
| --------------------- | --- | ------ |
| 🔍 Browse flower list | ✅   | ✅      |
| ➕ Add new flowers     | ✅   | ✅      |
| 🖊️ Edit flowers      | ✅   | ✅      |
| ❌ Delete flowers      | ✅   | ✅      |
| 🔒 JWT Login          | ✅   | ✅      |

---

## ✍️ **Author**

Project created as part of the task
**Coding Task — NerdArmy**
Author: *Sofiya Ignatovich*

---
