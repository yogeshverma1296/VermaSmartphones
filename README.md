# VermaSmartphones — MERN Stack Smartphone Inventory Manager

A full CRUD web application for managing smartphone inventory, built with **MongoDB, Express.js, React.js, and Node.js**.

Features: add, view, edit, and delete smartphones, live search, sorting, inventory stats, and a modern responsive UI.

---

## Project Structure

```
smartphone-crud-app/
├── backend/
│   ├── config/db.js            # MongoDB connection
│   ├── models/Phone.js         # Mongoose schema
│   ├── controllers/phoneController.js
│   ├── routes/phoneRoutes.js
│   ├── server.js               # Express entry point
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/phoneApi.js     # Axios API layer
    │   ├── components/         # Navbar, PhoneGrid, PhoneCard, PhoneForm, modals, Toast
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    └── package.json
```

## Prerequisites

- **Node.js** v18+ and npm
- **MongoDB** running locally (so it's visible in **MongoDB Compass**), or a MongoDB Atlas connection string

## 1. Set up MongoDB

Make sure MongoDB is running locally, e.g.:

```bash
mongod
```

Open **MongoDB Compass** and connect to `mongodb://127.0.0.1:27017` — you'll see the `smartphone_store` database and `phones` collection appear automatically once you add your first smartphone.

## 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env      # edit MONGO_URI if needed
npm run dev                # starts on http://localhost:5000
```

You should see:
```
Server running on http://localhost:5000
MongoDB Connected: 127.0.0.1
```

### API Endpoints

| Method | Endpoint            | Description              |
|--------|----------------------|---------------------------|
| GET    | /api/phones           | Get all smartphones       |
| GET    | /api/phones/:id        | Get a single smartphone   |
| POST   | /api/phones           | Create a new smartphone   |
| PUT    | /api/phones/:id        | Update a smartphone       |
| DELETE | /api/phones/:id        | Delete a smartphone       |

## 3. Frontend setup

Open a **new terminal**:

```bash
cd frontend
npm install
npm run dev                # starts on http://localhost:5173
```

Open **http://localhost:5173** in your browser.

## Notes

- The frontend calls the API at `http://localhost:5000/api/phones` (see `frontend/src/api/phoneApi.js`) — update this if you deploy the backend elsewhere.
- CORS is already enabled on the backend for local development.
- All required fields (Brand, Model, Price, RAM, Storage) are validated both in the React form and in the Mongoose schema.
- To reset your data, drop the `phones` collection from MongoDB Compass.

## Tech Stack

- **Frontend:** React 18, Vite, Axios, custom CSS design system
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
