import React from 'react';

const Loading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Please wait, we are fetching the data!</p>
      </div>
    </div>
  );
};

export default Loading;
