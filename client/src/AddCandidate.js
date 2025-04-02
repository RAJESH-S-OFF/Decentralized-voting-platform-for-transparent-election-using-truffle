/* import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const AddCandidate = ({ candidates, toPage, addCandidatefun, editCandidatefun }) => {
  const [candidateLocation, setCandidateLocation] = useState('');
  const [candidateParty, setCandidateParty] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    const allFieldsFilled =
      candidateLocation.trim() !== '' &&
      candidateParty.trim() !== '';
    setIsButtonEnabled(allFieldsFilled);
  }, [candidateLocation, candidateParty]);

  // Clear form inputs
  const clearForm = () => {
    setCandidateLocation('');
    setCandidateParty('');
  };

  return (
    <div className="container my-5">
    
      <h2 className="text-center mb-4">Your Voice!! Your Power!!!</h2>
      <p className="lead text-center">Add new candidates to the system</p>

      <form className="card p-4 shadow">
        
        <div className="mb-3">
          <label className="form-label">Candidate Location:</label>
          <input
            type="text"
            value={candidateLocation}
            onChange={(e) => setCandidateLocation(e.target.value)}
            placeholder="Enter candidate location"
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Candidate Party:</label>
          <input
            type="text"
            value={candidateParty}
            onChange={(e) => setCandidateParty(e.target.value)}
            placeholder="Enter candidate party"
            required
            className="form-control"
          />
        </div>

        <div className="d-flex justify-content-between">
          <button
            onClick={(event) => addCandidatefun(candidateLocation, candidateParty, event)}
            disabled={!isButtonEnabled}
            className="btn btn-success"
          >
            Add Candidate
          </button>
        </div>
      </form>

      <div className="text-center mt-4">
        <button
          className="btn btn-secondary"
          onClick={() => toPage("/adminHomePage")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default AddCandidate;
 */
import axios from "axios";
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const AddCandidate = ({ user,toPage }) => {
  const [candidateLocation, setCandidateLocation] = useState('');
  const [candidateParty, setCandidateParty] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    const allFieldsFilled =
      candidateLocation.trim() !== '' &&
      candidateParty.trim() !== '';
    setIsButtonEnabled(allFieldsFilled);
  }, [candidateLocation, candidateParty]);

  const handleSubmit =async (e) => {
    e.preventDefault();
    if(candidateLocation==''||candidateParty==''){
        alert("Fill the input field");return;}
    const userData = {
      name:user.name,
      password:user.password,
      aadhaar_no: user.aadhaar_no,
      email_id:user.email,
      location:user.location,
      constituency: candidateLocation,
      party:candidateParty,
      role: "Candidate",
      status:"add"
    };
    console.log(userData); 

    try {
      const response = await axios.post("http://localhost:5000/users", userData);
  
      if (response.status === 201) {
        alert("Candidate registration request Successfully Submitted");
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
  
    setCandidateParty("");
    setCandidateLocation("");
  };
  return (
    <div className="container my-5">
      {/* Header */}
      <h2 className="text-center mb-4">Your Voice!! Your Power!!!</h2>
      <p className="lead text-center">Add new candidates to the system</p>

      {/* Candidate Form */}
      <form className="card p-4 shadow">
        
        <div className="mb-3">
          <label className="form-label">Candidate Location:</label>
          <input
            type="text"
            value={candidateLocation}
            onChange={(e) => setCandidateLocation(e.target.value)}
            placeholder="Enter candidate location"
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Candidate Party:</label>
          <input
            type="text"
            value={candidateParty}
            onChange={(e) => setCandidateParty(e.target.value)}
            placeholder="Enter candidate party"
            required
            className="form-control"
          />
        </div>

        <div className="d-flex justify-content-between">
          <button
            onClick={(e)=>handleSubmit(e)}
            disabled={!isButtonEnabled}
            className="btn btn-success"
          >
            Add Candidate
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

export default AddCandidate;
