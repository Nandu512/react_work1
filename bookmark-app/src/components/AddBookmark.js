import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddBookmark() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleAdd = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user.bookmarks.length >= 5) {
      alert("You can only add 5 bookmarks!");
      return;
    }

    user.bookmarks.push({ title, url, added: new Date().toLocaleString() });

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map(u => (u.email === user.email ? user : u));
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("user", JSON.stringify(user));

    alert("Bookmark added!");
    navigate("/bookmarks");
  };

  return (
    <div className="add-bookmark-container">
      <div className="add-bookmark-form">
        <div className="add-bookmark-header">
          <div className="add-bookmark-icon">📚</div>
          <h2 className="add-bookmark-title">Add New Bookmark</h2>
          <p className="add-bookmark-subtitle">Save your favorite websites</p>
        </div>

        <div className="add-bookmark-inputs">
          <div className="input-group">
            <input
              type="text"
              placeholder="Bookmark Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="add-bookmark-input"
            />
          </div>
          <div className="input-group">
            <input
              type="url"
              placeholder="Website URL"
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="add-bookmark-input"
            />
          </div>
        </div>

        <button onClick={handleAdd} className="add-bookmark-btn">
          <span className="btn-text">Add Bookmark</span>
          <span className="btn-icon">➕</span>
        </button>
      </div>
    </div>
  );
}

export default AddBookmark;
