import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { FaTimes } from "react-icons/fa";

const Register = ({ onSwitchToLogin }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

  
    if (!name || !age || !email || !password || !confirmPassword) {
      setError("Please fill all the fields.");
      return;
    }
    
    const nameRegex = /^[A-Za-z\s]{2,}$/; 
    if (!nameRegex.test(name)) { 
      setError("Please enter a valid name (letters only, min 2 characters)."); 
      return; 
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailRegex.test(email)) { 
      setError("Please enter a valid email address."); 
      return; 
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (age < 18) {
      setError("You must be at least 18 years old.");
      return;
    }
    
    if (age > 100) {
      setError("Enter a valid age.");
      return;
    }
    
    if(password.length < 8){
      setError("Password must be at least 8 characters long");
      return;
    }

   
    localStorage.setItem("registeredEmail", email); 
    localStorage.setItem("registeredPassword", password);
    
    setSuccess("Registration Successful! Redirecting to login...");

   
    setTimeout(() => {
      if (onSwitchToLogin) {
        onSwitchToLogin();
      } else {
        navigate("/login");
      }
    }, 2000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>

       <button 
                onClick={() => navigate("/")} 
                style={styles.closeButton}
                aria-label="Close"
              >
                <FaTimes />
              </button>

        <h2 style={styles.title}>Sign Up</h2>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            placeholder="Name"
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          
          <label style={styles.label}>Age</label>
          <input
            type="number"
            placeholder="Age"
            style={styles.input}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />

          <label style={styles.label}>Email Id</label>
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

          <label style={styles.label}>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            style={styles.input}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          
          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>

        <p style={styles.text}>
          Already have an account?{" "}
          <button 
            type="button" 
            onClick={onSwitchToLogin} 
            style={{ ...styles.link, background: "none", border: "none", cursor: "pointer" }} 
          > 
            Login 
          </button>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px 20px",
    background: "#f9f9f9",
  },
  box: {
    position: "relative",
    backgroundColor: "#fff",
    padding: "30px 25px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",
  },
  title: {
    marginBottom: "15px",
    color: "#000",
    fontSize: "clamp(24px, 5vw, 28px)",
    fontWeight: "bold",
  },
  label: { 
    display: "block", 
    marginBottom: "4px", 
    fontWeight: "bold", 
    color: "#333", 
    fontSize: "13px",
    textAlign: "left"
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    fontSize: "16px",
    outline: "none",
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
    marginTop: "10px",
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
  },
  error: {
    color: "red",
    marginBottom: "10px",
    fontSize: "13px",
  },
  success: {
    color: "green",
    marginBottom: "10px",
    fontSize: "13px",
  },
    closeButton: {
    position: "absolute",
    top: "15px",
    right: "15px",
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "#333",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px",
    transition: "color 0.2s",
  },
};

export default Register;