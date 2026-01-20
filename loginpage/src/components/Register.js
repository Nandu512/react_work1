import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Register() {

  // states to store input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // for redirecting to login page
  const navigate = useNavigate();

  // function runs when Register button is clicked
  function registerUser() {

    axios.post(
      "https://worksheet-auth.mashupstack.com/register",
      {
        user_name: name,
        email: email,
        password: password
      }
    )
    .then(response => {
      setMessage("Registration Successful");

      // redirect to login page after success
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    })
    .catch(error => {
      if (error.response && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Registration failed");
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
      <h2>Register</h2>

      {message && <motion.div 
        className="alert alert-info"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {message}
      </motion.div>}

      <motion.input
        type="text"
        className="form-control mb-2"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />

      <motion.input
        type="text"
        className="form-control mb-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />

      <motion.input
        type="password"
        className="form-control mb-2"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      />

      <motion.button 
        className="btn btn-primary" 
        onClick={registerUser}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Register
      </motion.button>
    </motion.div>
  );
}

export default Register;
