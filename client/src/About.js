import React from 'react';
import "./About.css"
const About = ({toPage,loginStatus}) => {
  return (
    <div className="about-container container py-5">
      <h1 className="about-title text-center text-info mb-4">About Our Voting DApp</h1>
      <p className="about-text lead mb-4 text-center">
        Our decentralized voting application (DApp) provides a secure, transparent, and fair way to conduct elections using blockchain technology. By using Ethereum smart contracts, we ensure that each vote is recorded immutably, preventing tampering or manipulation of results.
      </p>
      
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-primary">Why Choose Blockchain for Voting?</h5>
              <p className="card-text">
                Blockchain technology ensures that votes are immutable and secure. Each vote is recorded on a public ledger, preventing any tampering with the election process. The decentralized nature of blockchain ensures transparency and trust.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-primary">Key Features</h5>
              <ul>
                <li>Secure and transparent voting process</li>
                <li>Immutable record of each vote</li>
                <li>Eliminates voting fraud and tampering</li>
                <li>Real-time results with high accuracy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <h3 className="text-success">Join the Revolution in Voting</h3>
        <p className="lead">Our system empowers people to vote in a secure, anonymous, and verifiable way, ensuring your voice matters.</p>
        <button className="btn btn-primary btn-lg" onClick={() => {if(loginStatus)  toPage("/vote"); else   toPage("/userlogin")}}>
          Start Voting Now
        </button>
      </div>
    </div>
  );
}

export default About;
