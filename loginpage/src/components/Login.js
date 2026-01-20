import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";

function Login() {

  // states for login form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // function runs when Login button is clicked
  function attemptLogin() {

    axios.post(
      "https://worksheet-auth.mashupstack.com/login",
      {
        email: email,
        password: password
      }
    )
    .then(response => {
      console.log("TOKEN:", response.data.token);
      alert("Successfully Logged In");
      setMessage("");
    })
    .catch(error => {
      if (error.response && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Login failed");
      }
    });
  }

  return (
    <motion.div 
      className="container mt-4 p-4 rounded shadow"
      style={{ 
        background: 'rgba(255, 255, 255, 0.3)', 
        backdropFilter: 'blur(10px)',
        maxWidth: '400px', 
        margin: 'auto',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Login</h2>

      {message && <motion.div 
        className="alert alert-danger"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {message}
      </motion.div>}

      <motion.input
        type="text"
        className="form-control mb-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />

      <motion.input
        type="password"
        className="form-control mb-2"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />

      <motion.button 
        className="btn btn-success" 
        onClick={attemptLogin}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Login
      </motion.button>
    </motion.div>
  );
}

export default Login;
