import React, { useState } from 'react';

const UserLogin = ({ setLoginStatus, handleAppLoginSubmit,forgetPassword }) => {
  const [Aadhaar_no, setAadhaar_no] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="container mt-5 p-3">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow-sm">
            <h3 className="text-center mb-4">
              <i className="fa fa-user" aria-hidden="true"></i> User Login
            </h3>
            <form onSubmit={(e) => handleAppLoginSubmit(Aadhaar_no, password, e)}>
              <div className="mb-3">
                <label htmlFor="Aadhaar_no" className="form-label">Aadhaar Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="Aadhaar_no"
                  placeholder="Enter your Aadhaar number"
                  value={Aadhaar_no}
                  onChange={(e) => setAadhaar_no(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={(e) =>forgetPassword(Aadhaar_no,e)}
                >
                  Forgot Password?
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
