import React, { useEffect, useState } from "react";

const Profile = ({ user, toPage }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="container mt-5 p-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {/* Profile Card */}
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white text-center">
              <h3>Voter Profile</h3>
            </div>
            <div className="card-body p-4">
              {/* Table for Voter Information */}
              <table className="table">
                <tbody>
                  <tr>
                    <td className="fw-bold w-50 align-middle">Name</td>
                    <td className="align-middle">{user.name}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold w-50 align-middle">Aadhaar Number</td>
                    <td className="align-middle">{user.aadhaar_no}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold w-50 align-middle">Password</td>
                    <td className="align-middle">
                      {showPassword ? user.password : "******"}
                      <button
                        onClick={togglePasswordVisibility}
                        className="btn btn-link p-0 ms-2"
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        {showPassword ? (
                          <i className="fa fa-eye-slash" aria-hidden="true"></i>
                        ) : (
                          <i className="fa fa-eye" aria-hidden="true"></i>
                        )}
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold w-50 align-middle">Email</td>
                    <td className="align-middle">{user.email}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold w-50 align-middle">Location</td>
                    <td className="align-middle">{user.location}</td>
                  </tr>
                  <tr>
                    <td className="fw-bold w-50 align-middle">Actions</td>
                    <td className="align-middle">
                      <button
                        onClick={() => toPage("/editvoter")}
                        className="btn btn-success me-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => toPage("/deletevoter")}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              {user.party ? (
                <>
                  <hr />
                  <h5 className="text-center">Candidate Information</h5>
                  <table className="table">
                    <tbody>
                      <tr>
                        <td className="fw-bold w-50 align-middle">Party</td>
                        <td className="align-middle">{user.party}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold w-50 align-middle">Constituency</td>
                        <td className="align-middle">{user.constituency}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold w-50 align-middle">Votes</td>
                        <td className="align-middle">{Number(user.voteCount)}</td>
                      </tr>
                      <tr>
                        <td className="fw-bold w-50 align-middle">Actions</td>
                        <td className="align-middle">
                          <button
                            onClick={() => toPage("/editCandidate")}
                            className="btn btn-success me-3"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => toPage("/deleteCandidate")}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </>
              ) : (
                <div className="text-center mt-4">
                  <button
                    onClick={() => toPage("/addCandidate")}
                    className="btn btn-primary"
                  >
                    Register as Candidate
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
