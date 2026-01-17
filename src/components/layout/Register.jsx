import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = ({onSuccess, onSwitchToLogin}) => {
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
    // Name validation 
    const nameRegex = /^[A-Za-z\s]{2,}$/; 
    if (!nameRegex.test(name)) 
        { 
            setError("Please enter a valid name (letters only, min 2 characters)."); 
            return; 
        }
    // Email validation 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailRegex.test(email)) 
        { 
            setError("Please enter a valid email address."); 
            return; 
        }

    if (password !== confirmPassword) {
      setError("Passwords does not match");
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
        setError("Password must be atleast 8 charecter long");
        return;
    }

    localStorage.setItem("registeredEmail", email); 
    localStorage.setItem("registeredPassword", password);

    setSuccess("Registration Successful");
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Register</h2>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <form onSubmit={handleSubmit}>
        {/* <h4 style={{color: "black"}}>Name</h4> */}
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
          <button onClick={onSwitchToLogin} style={{ ...styles.link, background: "none", border: "none", cursor: "pointer" }} > Login </button>
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
  success: {
    color: "green",
    marginBottom: "10px",
    fontSize: "14px",
  },
};

export default Register;
