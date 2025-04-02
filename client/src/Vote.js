  import React from "react";

  const Vote = ({ votingList, vote, hasVoted,user }) => {
    return (
      <div className="container py-5">
        <h1 className="text-center text-primary mb-4"> CONSTITUENCY: {user.location}   </h1>
        <p className="text-center mb-5 lead">
          Choose your preferred candidate from the list below and cast your vote. Once you vote, the choice is final, and you will not be able to change it.
        </p>
        
        {votingList.length > 0 ? (
          <table className="table  table-bordered table-hover">
            <thead className="text-center table-dark">
              <tr  >
                <th >INDEX</th>
                <th>NAME</th>
                <th>PARTY</th>
                <th>VOTE BUTTON</th>
              </tr>
            </thead>
            <tbody  className="text-center">
              {votingList.map((candidate, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{candidate.name.toUpperCase()}</td>
                  <td>{candidate.party}</td>
                  <td>
                    {/* Vote Button */}
                    <button
                      className={`btn btn-${hasVoted ? "secondary" : "primary"} w-50`}
                      onClick={() => vote(index)}
                      disabled={hasVoted}  // Disable the button if the user has already voted
                    >
                      {hasVoted ? "Already Voted" : "Vote"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center">
            <p className="text-muted">Loading votingList...</p>
          </div>
        )}

        {/* Information Text */}
        <div className="mt-4 text-center">
          <p className="text-muted">
            After voting, your vote will be recorded securely and anonymously using blockchain technology. Thank you for participating!
          </p>
        </div>
      </div>
    );
  };

  export default Vote;
