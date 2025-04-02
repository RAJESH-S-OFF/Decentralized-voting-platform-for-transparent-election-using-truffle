import React from 'react';

const Footer = () => {
  return (
    <div className="bg-dark text-light py-2" >
      <div className="container text-center">
        {/* Copyright and Developer Info */}
        <p className="mb-2 fs-6">&copy; 2024 E-Voting DApp. All rights reserved.</p>
        <p className="mb-3 fs-6">Developed by <strong>Selvaraj</strong></p>

        {/* Social Media Links with Icons */}
        <div className="d-flex justify-content-center gap-3">
          <a href="https://linkedin.com/in/selvaraj-r-24a3b7325" target="_blank" className="text-light fs-4" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://github.com/SELVARAJ-R10112004" target="_blank" className="text-light fs-4" rel="noopener noreferrer">
            <i className="fab fa-github"></i>
          </a>
          {/* Uncomment to add email link */}
          {/* <a href="mailto:2212074@gmail.com" className="text-light fs-4">
            <i className="fas fa-envelope"></i>
          </a> */}
        </div>
      </div>
    </div>
  );
}

export default Footer;
