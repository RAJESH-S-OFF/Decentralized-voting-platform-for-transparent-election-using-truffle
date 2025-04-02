import React from "react";
import RegisterVote from "./RegisterVote";
import "./Body.css";
const Body = ({ toPage }) => {
  const arr = [
    {
      title: "Susan B. Anthony",
      content: '- "Someone struggled for your right to vote. Use it."',
    },
    {
      title: "Abraham Lincoln",
      content: '- "The ballot is stronger than the bullet"',
    },
    {
      title: "George Jean Nathan",
      content: '- "Bad officials are elected by good citizens who do not vote"',
    },
    {
      title: "Lyndon B. Johnson",
      content: '- "A man without a vote is a man without protection"',
    },
    {
      title: "Martin Luther",
      content:
        '- "Our lives begin to end the day we become silent about things that matter"',
    },
    {
      title: "John F. Kennedy",
      content:
        '- "The ignorance of one voter in a democracy impairs the security of all"',
    },
  ];

  return (
    <>
      <div className="instructions-container container py-5 ">
        <h1 className="text-center mb-4 text-info fw-bold">
          Your Vote !! Your Choice!!!
        </h1>
        <div className="scrolling-cards-container">
          {arr.map((i, index) => (
            <div className="card card-hover-effect" key={index}>
              <div className="card-body">
                <h3 className="card-title text-primary">{i.title}</h3>
                <p className="card-text">{i.content}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button
            className="btn btn-primary btn-lg shadow-sm"
            onClick={()=>toPage("/registerVote")}
          >
             <i className="fa fa-user-plus" aria-hidden="true"></i> Register Now! 
          </button>
        </div>
      </div>
    </>
  );
};

export default Body;
