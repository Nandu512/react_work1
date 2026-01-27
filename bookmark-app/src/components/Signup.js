import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    setIsLoading(true);
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 1000));

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find(u => u.email === email)) {
      alert("User already exists!");
      setIsLoading(false);
      return;
    }

    users.push({ email, password, bookmarks: [] });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful!");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-form signup-form">
        <div className="auth-header">
          <div className="auth-icon">✨</div>
          <h2 className="auth-title">Join Us</h2>
          <p className="auth-subtitle">Create your account</p>
        </div>
        <div className="auth-input-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="auth-input"
          />
        </div>
        <button onClick={handleSignup} className="auth-button" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Signup"}
        </button>
      </div>
    </div>
  );
}

export default Signup;
