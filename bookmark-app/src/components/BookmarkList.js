import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BookmarkList() {
  const [bookmarks, setBookmarks] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const bookmarksPerPage = 3;
  const navigate = useNavigate();

  // Load bookmarks from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) setBookmarks(user.bookmarks);
  }, []);

  // Delete bookmark
  const handleDelete = index => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const user = JSON.parse(localStorage.getItem("user"));
      user.bookmarks.splice(index, 1);

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map(u => (u.email === user.email ? user : u));
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("user", JSON.stringify(user));

      setBookmarks([...user.bookmarks]);
    }
  };

  // Filter bookmarks based on search
  const filtered = bookmarks.filter(
    b =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.url.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination calculations
  const indexOfLast = currentPage * bookmarksPerPage;
  const indexOfFirst = indexOfLast - bookmarksPerPage;
  const currentBookmarks = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / bookmarksPerPage);

  return (
    <div className="bookmark-container">
      <div className="bookmark-header">
        <h2 className="bookmark-title">Your Bookmarks</h2>
      </div>

      <input
        type="text"
        placeholder="Search by title or URL"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="bookmark-search"
      />

      <ul className="bookmark-list">
        {currentBookmarks.map((b, i) => (
          <li
            key={i + indexOfFirst}
            className="bookmark-item"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="bookmark-content">
              <div className="bookmark-info">
                <strong>Title:</strong> {b.title} <br />
                <strong>URL:</strong>{" "}
                <a href={b.url} target="_blank" rel="noopener noreferrer" className="bookmark-link">
                  {b.url}
                </a>{" "}
                <br />
                <small className="bookmark-date">Added: {b.added}</small>
              </div>
              <div className="bookmark-actions">
                <button
                  onClick={() => handleDelete(i + indexOfFirst)}
                  className="bookmark-btn bookmark-btn-delete"
                >
                  Delete
                </button>
                <button
                  onClick={() =>
                    navigate("/edit", { state: { index: i + indexOfFirst } })
                  }
                  className="bookmark-btn bookmark-btn-edit"
                >
                  Edit
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination buttons */}
      <div className="pagination-container">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`pagination-btn ${i + 1 === currentPage ? 'active' : ''}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default BookmarkList;
