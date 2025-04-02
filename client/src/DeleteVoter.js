import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const DeleteVoter = ({ user,toPage}) => {
  const [email, setEmail] = useState(user.email);
  const [aadhar, setAadhar] = useState(user.aadhaar_no);

  const handleSubmit =async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    const p= !emailRegex.test(email);
     if(aadhar.length!=12||p){
       alert("Check Aadhaar no and Email id");   
       return ;
     }
    const userData = {
      name:user.name,
      password:user.password,
      aadhaar_no: aadhar,
      email_id: email,  
      location: user.location,
      constituency:"***",
       party:"***",
      role: "Voter",
      status:"delete",
    };
    console.log(userData); 

    try {
      const response = await axios.post("http://localhost:5000/users", userData);
  
      if (response.status === 201) {
        alert("Voter removal request Successfully Submitted");
      }
    } catch (error) {
      // Handle errors if the request fails
      if (error.response && error.response.status === 400) {
        // If error is 400, handle duplicate Aadhaar or validation error
        alert(error.response.data.message); return ;
      } else {
        alert('An error occurred. Please try again.');
      }
    }
  
  

    // Clear the form after submission
    setEmail("");
    setAadhar("");
    
  };  

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Delete Voter Info</h2>

      <form className="card p-4 shadow-sm" onSubmit={handleSubmit}>
        
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
            disabled
          />
        </div>

        
       

        {/* Submit Button */}
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary" >
            Submit
          </button>
        </div>

        <div className="text-left mt-2">
        <button
          className="btn btn-secondary"
          onClick={() => toPage("/profile")}
        >
          Back
        </button>
      </div>
      </form>
    </div>
  );
};

export default DeleteVoter;
