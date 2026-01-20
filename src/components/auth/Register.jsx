// Import statements
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";


// Styles for the Register component
const styles = {
  container: {minHeight: "100vh",display: "flex",justifyContent: "center",alignItems: "center",padding: "40px 20px",background: "#f9f9f9",},
  box: {position: "relative",backgroundColor: "#fff",padding: "30px 25px",borderRadius: "12px",width: "100%",maxWidth: "400px",textAlign: "center",boxShadow: "0px 8px 20px rgba(0,0,0,0.15)",},
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



// When user submits the registation form => this datas are collected and stored and shared to login component for authentication 
const Register = ({ onSwitchToLogin }) => {

  // State variables to store the form data
  const navigate = useNavigate(); //For automatic navigation after registration
  const [name, setName] = useState("");
  const [role, setRole] = useState("guest");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");



  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // No error at the start / Clear previous errors
    setSuccess(""); // No successData at the start / Clear previous success messages



    // Check if data is not given or input is done
    if (!name || !age || !email || !password || !confirmPassword) {
      //alert("Please fill all the fields.");
      return setError("Please fill all fields");
    }

    
    // Checking the name credentials
    const namePattern = /^[A-Za-z\s]$/;
    if (!namePattern.test(name)) {
      return setError("Please enter a valid name");
    }


    // Checking the email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return setError("Please enter a valid email address.");
    }


    // Checking the phone number format
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phoneNo)) {
      return setError("Please enter a valid 10-digit phone number.");
    }



    // Check if the password and confirm pass matches
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }


    // Additional validations for the age and password length
    if (age < 18) {
      setError("You must be at least 18 years old to register");
      return;
    }

    // Password length
    if (password.length < 5) {
      setError("Password must be minimum 5 characters long");
      return;
    }


    localStorage.setItem("registeredEmail", email);
    localStorage.setItem("registeredPassword", password);
    localStorage.setItem("registeredPhone", phoneNo);
    localStorage.setItem("registeredRole", role);


    //setSuccess("Registration Successful! Redirecting to login...");
    setSuccess("Registration Successful! Redirecting to login...");

    //After successful registration navigate to login page after 2 seconds
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


        {/* When cross button is clicked navigate to home page */}
        <button onClick={() => navigate("/")} style={styles.closeButton} aria-label="Close">
          <FaTimes />
        </button>

        {/* SignUp Heading */}
        <h2 style={styles.title}>Sign Up</h2>


        {/* Conditional rendering for error */}
        {error && <p style={styles.error}>{error}</p>}

        {/* Conditional rendering for success */}
        {success && <p style={styles.success}>{success}</p>}

        <form onSubmit={handleSubmit}>


          <label style={styles.label}>Register As</label>
          <select style={styles.input} value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="guest">Guest User</option>
            <option value="manager">Hotel Manager</option>
          </select>


          {/* Entering the name */}
          <label style={styles.label}>Name</label>
          <input type="text" placeholder="Enter your Name" style={styles.input} value={name} onChange={(e) => setName(e.target.value)} required/>

          {/* Entering the age */}
          <label style={styles.label}>Age</label>
          <input type="number" placeholder="Enter your Age" style={styles.input} value={age} onChange={(e)=>setAge(e.target.value)} required />

    

          {/* Entering the email */}
          <label style={styles.label}>Email Id</label>
          <input type="email" placeholder="Enter your Email" style={styles.input} value={email} onChange={(e)=>setEmail(e.target.value)} required />



          {/* Entering the phone number */}
          <label style={styles.label}>Phone Number</label>
          <input type="tel" placeholder="10 digit Mobile Number" style={styles.input} value={phoneNo} onChange={(e)=>setPhoneNo(e.target.value)} required maxLength={10} />



          {/* Enter the password */}
          <label style={styles.label}>Password</label>
          <input type="password" placeholder="Enter the Password" style={styles.input} value={password} onChange={(e)=>setPassword(e.target.value)} required />


          {/* Confirm Password */}
          <label style={styles.label}>Confirm Password</label>
          <input type="password" placeholder="Re Enter your Password" style={styles.input} value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required />



          <button type="submit" style={styles.button}>
            Register
          </button>


        </form>

        <p style={styles.text}>
          Already have an account?{" "}
          <button type="button" onClick={onSwitchToLogin} style={{...styles.link,background:"none",border:"none",cursor:"pointer"}}>
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;