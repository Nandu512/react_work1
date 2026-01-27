import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function EditBookmark() {
  const navigate = useNavigate();
  const location = useLocation();
  const { index } = location.state;

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const bookmark = user.bookmarks[index];
    setTitle(bookmark.title);
    setUrl(bookmark.url);
  }, [index]);

  const handleUpdate = () => {
    if (window.confirm("Are you sure you want to update this URL?")) {
      const user = JSON.parse(localStorage.getItem("user"));
      user.bookmarks[index] = { ...user.bookmarks[index], title, url };

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map(u => (u.email === user.email ? user : u));
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("user", JSON.stringify(user));

      alert("Bookmark updated!");
      navigate("/bookmarks");
    }
  };

  return (
    <div className="edit-bookmark-container">
      <div className="edit-bookmark-form">
        <div className="edit-bookmark-header">
          <div className="edit-bookmark-icon">✏️</div>
          <h2 className="edit-bookmark-title">Edit Bookmark</h2>
          <p className="edit-bookmark-subtitle">Update your bookmark details</p>
        </div>

        <div className="edit-bookmark-inputs">
          <div className="input-group">
            <input
              type="text"
              placeholder="Bookmark Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="edit-bookmark-input"
            />
          </div>
          <div className="input-group">
            <input
              type="url"
              placeholder="Website URL"
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="edit-bookmark-input"
            />
          </div>
        </div>

        <button onClick={handleUpdate} className="edit-bookmark-btn">
          <span className="btn-text">Update Bookmark</span>
          <span className="btn-icon">💾</span>
        </button>
      </div>
    </div>
  );
}

export default EditBookmark;
