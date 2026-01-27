import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddBookmark from "../components/AddBookmark";
import BookmarkList from "../components/BookmarkList";
import { logout } from "../utils/auth";

export default function Dashboard() {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (!user) navigate("/login");

    setBookmarks(JSON.parse(localStorage.getItem(user)) || []);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <h2>My Bookmarks</h2>
      <button onClick={handleLogout}>Logout</button>
      <AddBookmark bookmarks={bookmarks} setBookmarks={setBookmarks} />
      <BookmarkList bookmarks={bookmarks} setBookmarks={setBookmarks} />
    </>
  );
}
