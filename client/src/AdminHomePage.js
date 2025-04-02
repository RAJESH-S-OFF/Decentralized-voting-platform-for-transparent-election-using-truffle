import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminHomePage = ({ resultList, count }) => {
  const [candidatesList, setCandidatesList] = useState(resultList);
  const navigate = useNavigate();

  const handlePageNavigation = (path) => {
    navigate(path);
    console.log(`Navigated to: ${path}`);
  };

  return (
    <div className="container my-5">
      {/* Page Header */}
      <div className="text-center mb-4">
        <h1 className="display-5 fw-bold text-primary">Admin Dashboard</h1>
        <p className="lead text-muted">Manage the election results and settings from the dashboard below.</p>
      </div>

      {/* Admin Actions / Buttons */}
      <div className="d-flex justify-content-center gap-3 mb-5">
        <button className="btn btn-success" onClick={() => handlePageNavigation("/setVotingTime")}>
          Set Voting Time
        </button>
        <button className="btn btn-success position-relative" onClick={() => handlePageNavigation("/notification")}>
          Notification
          {count >= 0 && (
           <span
           className="badge rounded-circle bg-primary position-absolute top-0 start-100 translate-middle"
           style={{ fontSize: "1.1rem", width: "30px", height: "30px", color: "white" }}
         >
              {count}
            </span>
          )}
        </button>
      </div>

      {/* Candidates Table */}
      <h3 className="text-center mb-3">Current Candidates</h3>
      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-dark text-center">
            <tr>
              <th>SNo</th>
              <th>Name</th>
              <th>Constituency</th>
              <th>Party</th>
             
            </tr>
          </thead>
          <tbody>
            {candidatesList.length > 0 ? (
              candidatesList.map((candidate, index) => (
                <tr key={index} className="text-center">
                   <td>{index}</td> 
                  <td>{candidate.name.toUpperCase()}</td>
                  <td>{candidate.location}</td>
                  <td>{candidate.party}</td>
                 
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No results available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHomePage;
