import React, { useState } from 'react';
import Party_Location from './PartyWise';
import LocationWise from './LocationWise';

const Results = ({ resultList }) => {
  const [location, setLocation] = useState('');
  const [filteredCandidates, setFilteredCandidates] = useState(resultList);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    if (e.target.value === '') {
      setFilteredCandidates(resultList);
    }
  };

  const handleSearch = () => {
    if(resultList.length>0){
      const filtered = resultList
        .filter((candidate) => candidate.location.toLowerCase().includes(location.toLowerCase()))
        .sort((a, b) => b.voteCount - a.voteCount);
      setFilteredCandidates(filtered);
    } 
  };

  return (
    <div className="container my-5">
      {/* Page Title */}
      <div className="text-center mb-4">
        <h1 className="display-6 fw-bold">Election Results</h1>
        <p className="lead">Search by location to see resultList and their vote counts.</p>
      </div>

      {/* Search Section */}
      <div className="search-container mb-4 d-flex justify-content-center">
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="Enter Location Name"
          className="form-control me-2 w-50"
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>

      {/* Results Table */}
      {filteredCandidates.length > 0 ? (
        <table className="table table-hover table-bordered text-center">
          <thead className="table-secondary table-dark">
            <tr>
              <th>Index</th>
              <th>Name</th>
              <th>Party</th>
              <th>Votes</th>
              <th>Constituency</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map((candidate, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{candidate.name.toUpperCase()}</td>
                <td>{candidate.party}</td>
                <td>{candidate.voteCount}</td>
                <td>{candidate.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-muted">No resultList found for the specified location.</p>
      )}

      {/* Additional Information */}
      <div className="text-center mt-5">
        <h3 className="mb-3">Additional Insights</h3>
        <p className="text-muted">
          View detailed breakdowns of votes by party and by location below.
        </p>
        <div className="row">
          <div className="col-md-6">
            <Party_Location resultList={resultList} />
          </div>
          <div className="col-md-6">
            <LocationWise resultList={resultList} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
