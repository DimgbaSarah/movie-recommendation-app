import React, { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import Login from "./components/Login";
import Register from "./components/Register";
import ReviewSection from "./components/ReviewSection";
import Recommendations from "./components/Recommendations";
import api from "./api";
import "./styles/App.css";

function App() {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    api.get("/movies").then((res) => setMovies(res.data));
  }, []);

  const handleLogin = (user, token) => {
    setUser({ ...user, token });
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <div className="App">
      <header>
        <h1>🎬 Movie Recommendation App</h1>
        {user ? (
          <div>
            <span>Welcome, {user.username}! </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="auth-forms">
            <Login onLogin={handleLogin} />
            <Register />
          </div>
        )}
      </header>
      <main>
        {user && (
          <Recommendations user={user} onSelect={setSelectedMovie} />
        )}
        <MovieList movies={movies} onSelect={setSelectedMovie} />
        {selectedMovie && (
          <ReviewSection
            movie={selectedMovie}
            user={user}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </main>
    </div>
  );
}

export default App;