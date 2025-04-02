import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icon for password visibility toggle

const RegisterVote = ({toPage}) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [password, setPassword] = useState(""); // State for password
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [passwordValid, setPasswordValid] = useState(false); // State for password validation

  // Function to validate password
  const validatePassword = (password) => {
    const passwordStrength =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPasswordValid(passwordStrength.test(password));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
   const p= !emailRegex.test(email);
    if(aadhar.length!=12||p){
      alert("Check Aadhaar no and Email id");   
      return ;
    }
    else if(name==''||location==''){
        alert("Fill the inputs field");return;}
    const userData = {
      name,
      password,
      aadhaar_no: aadhar,
      email_id: email,
      location: location,
      constituency:"***",
       party:"***",
      role: "Voter",
      status:"add",
    };
    console.log(userData); 

    try {
      const response = await axios.post("http://localhost:5000/users", userData);
  
      if (response.status === 201) {
        alert("Voter Registration Successfully Submitted");
      }
    } catch (error) {
      // Handle errors if the request fails
      if (error.response && error.response.status === 400) {
        // If error is 400, handle duplicate Aadhaar or validation error
        alert("You are already registered"); return ;
      } else {
        alert('An error occurred. Please try again.');
      }
    }
  
  
  finally{
      // Clear the form after submission
      setName("");
      setEmail("");
      setAadhar("");
      setLocation("");
      setPassword("");
      toPage("/");
  }
    
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Register Your Vote</h2>

      <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="mb-3">
          <label className="form-label" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email Input */}
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Email id
          </label>
          <input
            type="text"
            id="email"
            className="form-control"
            placeholder="Enter Your Email id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* District Input */}
        <div className="mb-3">
          <label className="form-label" htmlFor="location">
            District:
          </label>
          <input
            type="text"
            id="location"
            className="form-control"
            placeholder="Enter Your District"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        {/* Aadhar Input */}
        <div className="mb-3">
          <label className="form-label" htmlFor="aadhar">
            Aadhar Number:
          </label>
          <input
            type="text"
            id="aadhar"
            className="form-control"
            placeholder="Enter Your Aadhar Number"
            value={aadhar}
            onChange={(e) => setAadhar(e.target.value)}
            required
          />
        </div>

        {/* Password Input with Visibility Toggle */}
        <div className="mb-3 position-relative">
          <label className="form-label" htmlFor="password">
            Password:
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className="form-control"
            placeholder="Enter Your Password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value); // Validate password as user types
            }}
            
            minLength="8"
            title="Password must be at least 8 characters long, contain uppercase and lowercase letters, a number, and a special character."
          />
          <span
            className="position-absolute top-50 end-0 translate-middle-y me-2"
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer" }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
          {/* Tooltip with password instructions */}
          <small className="form-text text-muted">
            Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.
          </small>
        </div>

       

        {/* Submit Button */}
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary" disabled={!passwordValid}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterVote;
