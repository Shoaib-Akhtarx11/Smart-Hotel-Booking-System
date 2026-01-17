import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({onSuccess, onSwitchToRegister}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const registeredEmail = localStorage.getItem("registeredEmail"); 
    const registeredPassword = localStorage.getItem("registeredPassword");

    if (email === registeredEmail && password === registeredPassword) {
      alert("Login successful");
      setError("");
      onSuccess();
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
        <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="Email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        <p style={styles.text}>
          Don't have an account?{" "}
           <button onClick={onSwitchToRegister} style={{ ...styles.link, background: "none", border: "none", cursor: "pointer" }} >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "none",
  },
  box: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "12px",
    width: "350px",
    textAlign: "center",
    boxShadow: "0px 8px 20px rgba(0,0,0,0.3)",
  },
  title: {
    marginBottom: "20px",
    color: "#000",
    fontSize: "28px",
    fontWeight: "bold",
    letterSpacing: "1px",
  },
    label: { display: "block", 
    marginBottom: "5px", 
    fontWeight: "bold", 
    color: "#000", 
    fontSize: "14px",
    textAlign: "left"
  },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "15px",
    border: "1px solid #000",
    boxSizing: "border-box",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.3s ease",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.15)",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    boxShadow: "0px 6px 12px rgba(0,0,0,0.25)",
    marginTop: "20px",
  },
  buttonHover: {
    backgroundColor: "#333",
  },
  text: {
    marginTop: "15px",
    color: "#000",
    fontSize: "14px",
  },
  link: {
    color: "#000",
    fontWeight: "bold",
    textDecoration: "none",
    transition: "color 0.3s ease",
  },
  error: {
    color: "red",
    marginBottom: "10px",
    fontSize: "14px",
  },
};

export default Login;
