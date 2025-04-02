import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SetVotingTime = ({ toPage, setVotingTimes }) => {
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');

  return (
    <div className="container my-5">
      {/* Header */}
      <h2 className="text-center mb-4">Set Voting Time</h2>
      <p className="lead text-center">Configure the start and end times for the voting period</p>

      {/* Voting Time Form */}
      <form className="card p-4 shadow">
        <div className="mb-3">
          <label className="form-label" htmlFor="startDateTime">
            Start Date & Time:
          </label>
          <input
            type="datetime-local"
            id="startDateTime"
            placeholder='DD-MM-YYYY'
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="endDateTime">
            End Date & Time:
          </label>
          <input
            type="datetime-local"
            id="endDateTime"
            placeholder='DD-MM-YYYY'
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
            required
            className="form-control"
          />
        </div>

        {/* Submit Button */}
        <div className="d-flex justify-content-between">
          <button
            onClick={
              (e) => {
                if(startDateTime!==''&&endDateTime!==''){setStartDateTime('DD-MM-YYYY');setEndDateTime('DD-MM-YYYY');setVotingTimes(startDateTime, endDateTime, e)}
                else alert("Select Time")}
              }
            type="submit"
            className="btn btn-primary"
          >
            Set Voting Time
          </button>
        </div>
      </form>

      {/* Back Button */}
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

export default SetVotingTime;
