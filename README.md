# Movie Recommendation App

A full-stack movie recommendation and review app built with **React**, **Node.js (Express)**, and **MongoDB**.  
Users can register, log in, browse movies, view recommendations, and leave reviews.

---

## Features

- User authentication (register, login, logout)
- Browse a list of movies
- Leave ratings and reviews for movies
- "Recommended for You" section (suggests movies the user hasn’t reviewed)
- Responsive and accessible UI
- Modern deployment-ready setup

---

## Tech Stack

- **Frontend:** React, Axios, CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB (Atlas)
- **Authentication:** JWT
- **Deployment:** Vercel (frontend), Render (backend), MongoDB Atlas (database)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/movie-recommendation-app.git
cd movie-recommendation-app
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

- Create a `.env` file in the `backend` folder based on `.env.example`:
  ```
  MONGO_URI=your-mongodb-connection-string
  JWT_SECRET=your-secret-key
  PORT=5000
  ```
- Start the backend server:
  ```bash
  npm run dev
  ```

### 3. Setup the Frontend

```bash
cd ../frontend
npm install
```

- Update `src/api.js` to point to your backend URL (local or deployed).
- Start the frontend app:
  ```bash
  npm start
  ```

---

## Deployment

- **Backend:** Deploy to [Render](https://render.com/) or [Railway](https://railway.app/).
- **Frontend:** Deploy to [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/).
- **Database:** Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- See [Deployment Instructions](#deployment-instructions) below for details.

---

## Accessibility

- All forms use associated labels and ARIA attributes.
- All movie cards are keyboard-accessible.
- All images have descriptive alt text.
- Status and error messages use `aria-live`.

---

## Folder Structure

```
movie-recommendation-app/
  backend/
    models/
    routes/
    controllers/
    middleware/
    .env.example
    ...
  frontend/
    src/
      components/
      styles/
      api.js
    ...
```

---

## Deployment Instructions

1. **Push code to GitHub.**
2. **Deploy MongoDB Atlas** and get your connection string.
3. **Deploy backend** (Render/Railway/Heroku):
    - Set environment variables: `MONGO_URI`, `JWT_SECRET`, `PORT`
4. **Deploy frontend** (Vercel/Netlify):
    - Set `REACT_APP_API_URL` or update `api.js` to point to your deployed backend.
5. **Configure CORS** on backend to allow frontend domain.
6. **Test your live app!**

---

## License

MIT
