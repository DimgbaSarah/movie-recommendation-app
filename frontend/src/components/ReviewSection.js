import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/ReviewSection.css";

function ReviewSection({ movie, user, onClose }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    api.get(`/reviews/${movie._id}`).then((res) => setReviews(res.data));
  }, [movie._id]);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setMsg("");
    try {
      await api.post(`/reviews/${movie._id}`, { rating, comment });
      setMsg("Review added!");
      setComment("");
      setRating(5);
      const res = await api.get(`/reviews/${movie._id}`);
      setReviews(res.data);
    } catch (error) {
      setErr(error.response?.data?.message || "Failed to add review");
    }
  };

  return (
    <section className="review-section" aria-label={`Reviews for ${movie.title}`}>
      <button className="close-btn" onClick={onClose} aria-label="Close review section">
        Close
      </button>
      <h2>Reviews for {movie.title}</h2>
      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((r) => (
            <div className="review" key={r._id}>
              <strong>{r.user?.username || "Anonymous"}</strong>
              <span className="stars" aria-label={`Rated ${r.rating} out of 5`}>
                {"★".repeat(r.rating)}
              </span>
              <p>{r.comment}</p>
            </div>
          ))
        )}
      </div>
      {user && (
        <form onSubmit={submit} className="review-form" aria-label="Add your review">
          <h4>Add Your Review</h4>
          <label htmlFor="review-rating">Rating:</label>
          <select
            id="review-rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option value={num} key={num}>
                {num}
              </option>
            ))}
          </select>
          <label htmlFor="review-comment">Your review:</label>
          <textarea
            id="review-comment"
            placeholder="Your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <button type="submit">Submit Review</button>
          {msg && (
            <div className="success" aria-live="polite" role="status">
              {msg}
            </div>
          )}
          {err && (
            <div className="error" aria-live="polite" role="alert">
              {err}
            </div>
          )}
        </form>
      )}
    </section>
  );
}

export default ReviewSection;