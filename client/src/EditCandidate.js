// import React, { useState, useEffect } from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';

// const EditCandidate = ({ candidates, toPage, editCandidatefun }) => {
//   const [candidateName, setCandidateName] = useState('');
//   const [candidateLocation, setCandidateLocation] = useState('');
//   const [candidateParty, setCandidateParty] = useState('');
  
//   const [oldCandidateName, setOldCandidateName] = useState('');
//   const [oldCandidateLocation, setOldCandidateLocation] = useState('');
//   const [oldCandidateParty, setOldCandidateParty] = useState('');
  
//   const [isButtonEnabled, setIsButtonEnabled] = useState(false);

//   useEffect(() => {
//     const allFieldsFilled =
//       candidateName.trim() !== '' &&
//       candidateLocation.trim() !== '' &&
//       candidateParty.trim() !== '' &&
//       oldCandidateName.trim() !== '' &&
//       oldCandidateLocation.trim() !== '' &&
//       oldCandidateParty.trim() !== '';
      
//     setIsButtonEnabled(allFieldsFilled);
//   }, [candidateName, candidateLocation, candidateParty, oldCandidateName, oldCandidateLocation, oldCandidateParty]);

//   // Clear form inputs
//   const clearForm = () => {
//     setCandidateName('');
//     setCandidateLocation('');
//     setCandidateParty('');
//     setOldCandidateName('');
//     setOldCandidateLocation('');
//     setOldCandidateParty('');
//   };

//   return (
//     <div className="container my-5">
//       {/* Header */}
//       <h2 className="text-center mb-4">Admin Panel</h2>
//       <p className="lead text-center">Edit existing candidates in the system</p>

//       {/* Candidate Form */}
//       <form className="card p-4 shadow">
//         <div className="mb-3">
//           <label className="form-label">Old Candidate Name:</label>
//           <input
//             type="text"
//             value={oldCandidateName}
//             onChange={(e) => setOldCandidateName(e.target.value)}
//             placeholder="Enter the old candidate name"
//             required
//             className="form-control"
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Old Candidate Location:</label>
//           <input
//             type="text"
//             value={oldCandidateLocation}
//             onChange={(e) => setOldCandidateLocation(e.target.value)}
//             placeholder="Enter the old candidate location"
//             required
//             className="form-control"
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">Old Candidate Party:</label>
//           <input
//             type="text"
//             value={oldCandidateParty}
//             onChange={(e) => setOldCandidateParty(e.target.value)}
//             placeholder="Enter the old candidate party"
//             required
//             className="form-control"
//           />
//         </div>

//         <div className="mb-3">
//           <label className="form-label">New Candidate Name:</label>
//           <input
//             type="text"
//             value={candidateName}
//             onChange={(e) => setCandidateName(e.target.value)}
//             placeholder="Enter new candidate name"
//             required
//             className="form-control"
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">New Candidate Location:</label>
//           <input
//             type="text"
//             value={candidateLocation}
//             onChange={(e) => setCandidateLocation(e.target.value)}
//             placeholder="Enter new candidate location"
//             required
//             className="form-control"
//           />
//         </div>
//         <div className="mb-3">
//           <label className="form-label">New Candidate Party:</label>
//           <input
//             type="text"
//             value={candidateParty}
//             onChange={(e) => setCandidateParty(e.target.value)}
//             placeholder="Enter new candidate party"
//             required
//             className="form-control"
//           />
//         </div>

//         <div className="d-flex justify-content-between">
//           <button
//             onClick={(event) => editCandidatefun(oldCandidateName, oldCandidateLocation, oldCandidateParty, candidateName, candidateLocation, candidateParty, event)}
//             disabled={!isButtonEnabled}
//             className="btn btn-success"
//           >
//             Edit Candidate
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

// export default EditCandidate;
import axios from "axios";
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const EditCandidate = ({ user,candidates, toPage, addCandidatefun, editCandidatefun }) => {
  const [candidateLocation, setCandidateLocation] = useState(user.constituency);
  const [candidateParty, setCandidateParty] = useState(user.party);
  const [email,setEmail]=useState(user.email);
  const [aadhar, setAadhar] = useState(user.aadhaar_no);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    const allFieldsFilled =
      candidateLocation.trim() !== '' &&
      candidateParty.trim() !== '';
    setIsButtonEnabled(allFieldsFilled);
  }, [candidateLocation, candidateParty]);

  const handleSubmit =async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
   const p= !emailRegex.test(email);
    if(email==''||candidateLocation==''||candidateParty==''){
        alert("Enter all the details required");
        return;}
    else if(aadhar.length!==12||p){
      alert("Check Aadhar number and email id");return;
    }
    
    const userData = {
      name:user.name,
      password:user.password,
      aadhaar_no: user.aadhaar_no,
      email_id:user.email,
      location:user.location,
      constituency: candidateLocation,
      party:candidateParty,
      role: "Candidate",
      status:"edit"
      
    };
    console.log(userData); 

    try {
      const response = await axios.post("http://localhost:5000/users", userData);
  
      if (response.status === 201) {
        alert("Candidate modification request Successfully Submitted");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message); return ;
      } else {
        alert('An error occurred. Please try again.');
       // console.log(error);
      }
    }
    setEmail("");
    setAadhar("");
    setCandidateParty("");
    setCandidateLocation("");
    toPage("/profile")
  };
  return (
    <div className="container my-5">
      {/* Header */}
      <h2 className="text-center mb-4">Your Voice!! Your Power!!!</h2>
      <p className="lead text-center">Edit existing candidate info  in the system</p>

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
            disabled={!isButtonEnabled}
            className="btn btn-success"
          >
            Edit Candidate
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

export default EditCandidate;
