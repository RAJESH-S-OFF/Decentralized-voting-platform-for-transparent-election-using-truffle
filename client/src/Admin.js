import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Admin = ({ resultList }) => {
  const [candidateName, setCandidateName] = useState('');
  const [candidateLocation, setCandidateLocation] = useState('');
  const [candidateParty, setCandidateParty] = useState('');
  const [candidatesList, setCandidatesList] = useState(resultList);
  const [deleteCandidateIndex, setDeleteCandidateIndex] = useState('');
  const [editCandidateIndex, setEditCandidateIndex] = useState('');
  const [editName, setEditName] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [editParty, setEditParty] = useState('');

  return (
    <div className="container my-5">
      {/* Admin Header */}
      <div className="text-center mb-4">
        <h1 className="display-6">Admin Panel</h1>
        <p className="lead">Manage resultList efficiently using the tools below.</p>
      </div>

      {/* Add Candidate Form */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">Add Candidate</div>
        <div className="card-body">
          <form className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Candidate Name:</label>
              <input
                type="text"
                className="form-control"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                placeholder="Enter candidate name"
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Candidate Location:</label>
              <input
                type="text"
                className="form-control"
                value={candidateLocation}
                onChange={(e) => setCandidateLocation(e.target.value)}
                placeholder="Enter candidate location"
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Candidate Party:</label>
              <input
                type="text"
                className="form-control"
                value={candidateParty}
                onChange={(e) => setCandidateParty(e.target.value)}
                placeholder="Enter candidate party"
                required
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-success w-100">
                Add Candidate
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Delete Candidate Form */}
      <div className="card mb-4">
        <div className="card-header bg-danger text-white">Delete Candidate</div>
        <div className="card-body">
          <form className="row g-3">
            <div className="col-md-12">
              <label className="form-label">Candidate Index to Delete:</label>
              <input
                type="number"
                className="form-control"
                value={deleteCandidateIndex}
                onChange={(e) => setDeleteCandidateIndex(e.target.value)}
                placeholder="Enter candidate index"
                required
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-danger w-100">
                Delete Candidate
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Edit Candidate Form */}
      <div className="card mb-4">
        <div className="card-header bg-warning text-white">Edit Candidate</div>
        <div className="card-body">
          <form className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Candidate Index to Edit:</label>
              <input
                type="number"
                className="form-control"
                value={editCandidateIndex}
                onChange={(e) => setEditCandidateIndex(e.target.value)}
                placeholder="Enter index to edit"
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">New Name:</label>
              <input
                type="text"
                className="form-control"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Enter new name"
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">New Location:</label>
              <input
                type="text"
                className="form-control"
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
                placeholder="Enter new location"
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">New Party:</label>
              <input
                type="text"
                className="form-control"
                value={editParty}
                onChange={(e) => setEditParty(e.target.value)}
                placeholder="Enter new party"
                required
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-warning w-100">
                Edit Candidate
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Display the list of resultList in a table */}
      <h3 className="text-center mt-5">Current Candidates</h3>
      <div className="table-responsive">
        <table className="table table-striped table-hover mt-3">
          <thead className="table-dark text-center">
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Party</th>
              <th>Index</th>
            </tr>
          </thead>
          <tbody>
            {candidatesList.length > 0 ? (
              candidatesList.map((candidate, index) => (
                <tr key={index} className="text-center">
                  <td>{candidate.name}</td>
                  <td>{candidate.location}</td>
                  <td>{candidate.party}</td>
                  <td>{index}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No resultList available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
