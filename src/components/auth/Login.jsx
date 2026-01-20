// Imported useState
import React, { useState } from "react";

// Link is used to make clickable links like <a> but instead it do not reload the entire page it only updates the link.
// useNavigate is used to link two pages programatically via code , instead user clicking and redirecting to the page.
import { Link, useNavigate } from "react-router-dom";

// This is react icon
import { FaTimes } from "react-icons/fa";


// All the styles of Login Page
const styles={
  container:{height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f4f4f4",padding: "20px",},
  box:{position: "relative",backgroundColor: "#fff",padding: "40px 30px",borderRadius: "12px",width: "100%",maxWidth: "400px",textAlign: "center",boxShadow: "0px 8px 20px rgba(0,0,0,0.1)"},
  title:{marginBottom: "20px",color: "#000",fontSize: "clamp(22px, 5vw, 28px)",fontWeight: "bold",letterSpacing: "1px",},
  label:{display: "block",marginBottom: "5px",fontWeight: "bold",color: "#000",fontSize: "14px",textAlign: "left"},
  input:{width: "100%",padding: "12px",borderRadius: "8px",marginBottom: "15px",border: "1px solid #ccc",boxSizing: "border-box",fontSize: "16px",outline: "none",},
  button:{width: "100%",padding: "12px",backgroundColor: "#000",color: "#fff",border: "none",borderRadius: "8px",cursor: "pointer",fontSize: "16px",fontWeight: "bold",marginTop: "10px",},
  text:{marginTop: "15px",color: "#666",fontSize: "14px",},
  link:{color: "#000",fontWeight: "bold",textDecoration: "none",},
  error:{color: "red",marginBottom: "10px",fontSize: "14px",},
  closeButton:{position: "absolute",top: "15px",right: "15px",background: "none",border: "none",fontSize: "20px",cursor: "pointer",color: "#333",display: "flex",alignItems: "center",justifyContent: "center",padding: "5px",transition: "color 0.2s",},
};





// Login : is the main login component
// onSuccess : is the function that is called when the login is successful
// onSwitchToRegister : is the function that is called when the user wants to switch to register

const Login = ({ onSuccess, onSwitchToRegister }) => {

  // Used UseState Hook to store the state of the component
  const [email, setEmail] = useState(""); // Stores the email data
  const [password, setPassword] = useState(""); // Stores the password data
  const [role, setRole] = useState("guest"); // Guest is set as default role
  const [error, setError] = useState(""); // Stores the error data

  // Using useNavigate Hook to redirect to the other pages
  const navigate = useNavigate();



  // Function to handle the submition of the lofin form
  // This function runs when the user clicks the login button
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default behavior of the form => reloading page when submitting is stopped
    
    // Checking if the email and password are not empty
    if (!email || !password) {
      setError("Please fill in all fields");
      return; // This will stop the function from running further
    }

    // Simulating successful login
    localStorage.setItem("authToken", "dummy-token");
    localStorage.setItem("userRole", role);

    onSuccess(`Login successful as ${role}`); // This will call the onSuccess function passed from the parent component
    setError(""); // This will clear the error message if present

    // Redirect based on role
    if (role === "admin") {
      navigate("/admin"); // This will redirect the user to the admin page
    } else if (role === "manager") {
      navigate("/manager"); // This will redirect the user to the manager page
    } else {
      navigate("/"); // This will redirect the user to the home page
    }
  };

  // This is the JSX code for the Login component
  return (
    <div style={styles.container}>
      <div style={styles.box}>

        {/*Close*/}
        <button onClick={() => navigate("/")} style={styles.closeButton} aria-label="Close">
          <FaTimes />
        </button>

        {/*Login heading*/}
        <h2 style={styles.title}>Login</h2>



        {/*Error message*/}
        {
          error && <p style={styles.error}>{error}</p>
        }



        {/*Login form*/}
        <form onSubmit={handleSubmit}>

          {/*Login As "Guest"/"Manager"/"Admin"*/}
          <label style={styles.label}>Login As</label>
          <select style={styles.input} value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="guest">Guest User</option>
            <option value="manager">Hotel Manager</option>
            <option value="admin">System Admin</option>
          </select>


          {/*Email*/}
          <label style={styles.label}>Email</label>
          <input type="email" placeholder="Email" style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} required/>
          
          
          {/*Password*/}
          <label style={styles.label}>Password</label>
          <input type="password" placeholder="Password" style={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} required/>

          {/*Login button*/}
          <button type="submit" style={styles.button}>
            Login
          </button>

        </form>

        <p style={styles.text}>
          Don't have an account?{" "}
          <button type="button" onClick={onSwitchToRegister} style={{ ...styles.link, background: "none", border: "none", cursor: "pointer" }}>
            Sign Up
          </button>
        </p>

        
      </div>
    </div>
  );
};

export default Login;