import React from 'react';

const AdminLoginPage = ({ login }) => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="text-center mb-4">
        <h1 className="display-5 fw-bold"> <i className="fa fa-user-shield" aria-hidden="true"></i> <br />Admin Login</h1>
        <p className="lead display-7">Access the administrative panel to manage candidates and oversee the election process.</p>
      </div>
      
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body text-center">
          <p className="card-text mb-4">Please click the login button below to proceed to the admin dashboard.</p>
          <button className="btn btn-primary btn-lg w-100" onClick={login}>Login</button>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
