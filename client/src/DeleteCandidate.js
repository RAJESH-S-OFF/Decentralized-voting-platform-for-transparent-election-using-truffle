// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const DeleteCandidate = ({ candidates, toPage, deleteCandidateFun }) => {
//   const [candidateName, setCandidateName] = useState('');
//   const [candidateLocation, setCandidateLocation] = useState('');
//   const [candidateParty, setCandidateParty] = useState('');
//   const [isButtonEnabled, setIsButtonEnabled] = useState(false);


//   // Enable delete button only if all fields are filled
//   useEffect(() => {
//     const allFieldsFilled =
//       candidateName.trim() !== '' &&
//       candidateLocation.trim() !== '' &&
//       candidateParty.trim() !== '';
//     setIsButtonEnabled(allFieldsFilled);
//   }, [candidateName, candidateLocation, candidateParty]);

//   const clearForm = () => {
//     setCandidateName('');
//     setCandidateLocation('');
//     setCandidateParty('');
//   };
//   return (
//     <div className="container my-5">
//       {/* Header */}
//       <h2 className="text-center mb-4">Admin Panel</h2>
//       <p className="lead text-center">Delete candidates from the system</p>

//       {/* Candidate Form */}
//       <form className="card p-4 shadow">
//         <div className="mb-3">
//           <label className="form-label">Candidate Name:</label>
//           <input
//             type="text"
//             value={candidateName}
//             onChange={(e) => setCandidateName(e.target.value)}
//             placeholder="Enter candidate name"
//             required
//             className="form-control"
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Candidate Location:</label>
//           <input
//             type="text"
//             value={candidateLocation}
//             onChange={(e) => setCandidateLocation(e.target.value)}
//             placeholder="Enter candidate location"
//             required
//             className="form-control"
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Candidate Party:</label>
//           <input
//             type="text"
//             value={candidateParty}
//             onChange={(e) => setCandidateParty(e.target.value)}
//             placeholder="Enter candidate party"
//             required
//             className="form-control"
//           />
//         </div>

//         {/* Delete Button */}
//         <div className="d-flex justify-content-between">
//           <button
//             onClick={(event) => deleteCandidateFun(candidateName, candidateLocation, candidateParty, event)}
//             disabled={!isButtonEnabled}
//             className="btn btn-danger"
//           >
//             Delete Candidate
//           </button>
//           <button
//             onClick={clearForm}
//             type="button"
//             className="btn btn-secondary"
//           >
//             Clear
//           </button>
//         </div>
//       </form>

//       {/* Back Button */}
//       <div className="text-center mt-4">
//         <button
//           className="btn btn-secondary"
//           onClick={() => toPage("/adminHomePage")}
//         >
//           Back
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DeleteCandidate;


import axios from "axios";
import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const DeleteCandidate = ({ user, toPage }) => {
  const [email,setEmail]=useState(user.email);
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
      aadhaar_no: user.aadhaar_no,
      email_id:user.email,
      location:user.location,
      constituency: user.location,
      party:user.party,
      role: "Candidate",
      status:"delete"
    };
    console.log(userData); 

    try {
      const response = await axios.post("http://localhost:5000/users", userData);
  
      if (response.status === 201) {
        alert("Candidate removal request Successfully Submitted");
      }
    } catch (error) {
      // Handle errors if the request fails
      if (error.response && error.response.status === 400) {
        // If error is 400, handle duplicate Aadhaar or validation error
        alert(error.response.data.message); return ;
      } else {
        alert('An error occurred. Please try again.');
       // console.log(error);
      }
    }
    setEmail("");
    setAadhar("");
  
  };
  return (
    <div className="container my-5">
      {/* Header */}
      <h2 className="text-center mb-4">Your Voice!! Your Power!!!</h2>
      <p className="lead text-center">Request form for sending  candidate deletion process</p>

      {/* Candidate Form */}
      <form className="card p-4 shadow">
        
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
        

        <div className="d-flex justify-content-between">
          <button
            onClick={(e)=>handleSubmit(e)}
            className="btn btn-success"
          >
            Delete Candidate
          </button>
        </div>
      </form>

      {/* Back Button */}
      <div className="text-center mt-4">
        <button
          className="btn btn-secondary"
          onClick={() => toPage("/profile")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default DeleteCandidate;
