import React, { useState, useEffect } from "react";
import axios from "axios";

const Notification = ({users,setUsers,toPage,handleAccept,count,setCount,sendMail }) => {
  function handleReject(name,email,role,status,aadhaar_no){
    const filter=users.filter((user)=>user.aadhaar_no!=aadhaar_no||user.status!==status||user.role!==role);
      setUsers(filter)  
        axios.delete("http://localhost:5000/users", {
          data: {
            aadhaar_no: aadhaar_no,
            role: role,
            status: status
          }
        })
        .then(response => {
          console.log(response.data.message);
          sendMail(email,name,"You have submitted a request using this "+ aadhaar_no+" to "+status+" "+role +" details was rejected")
        })
        .catch(error => {
          console.error("Deleting user from database:", error.response ? error.response.data.message : error.message);
        });
        

       /*  axios
      .post("http://localhost:5000/send-email", {
        email: email,
        name: name,
        message:"You had submitted request using this "+ aadhaar_no+" to "+status+" "+role +" details was rejected"
      })
      .then((response) => {
        alert("Email sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert("Failed to send email.");
      }); */
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setUsers(response.data); 
        setCount(users.length)
      })
      .catch((error) => {
        console.error("Fetching users from database Process:", error); // Log any error
      });
      
  }, []);

  useEffect(() => {
    setCount(users.length)
    console.log("No of notification"+users.length)
  }, [users]);


  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Pending Requests</h2>

      {users.length > 0 ? (
        <div className="row">
          {users.map((user,index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title">
                    Request: <span className="text-info">{user.status}</span> - {user.role}
                  </h5>
                  <p className="card-text">
                    {user.role !== "Candidate" && (
                        <>
                          <strong>Name:</strong> {user.name} <br />
                        </>
                    )}
                    
                    <strong>Email:</strong> {user.email_id} <br />
                    <strong>Aadhar No:</strong> {user.aadhaar_no} <br />
                    <strong>{user.role === "Candidate" ? "Constituency" : "Location"}:</strong> {user.role === "Candidate" ? user.constituency : user.location} <br />

                    <strong>{user.role === "Candidate" ? `Party: ${user.party}` : ""}</strong>

                  </p>
                  <div className="d-flex justify-content-between">
                    <button  onClick={()=>handleAccept(user.name,user.password,user.aadhaar_no,user.email_id,user.location,user.constituency,user.party, user.role,user.status)}className="btn btn-success btn-sm">Accept</button>
                    <button  onClick={()=>handleReject(user.name,user.email_id,user.role,user.status,user.aadhaar_no)}className="btn btn-danger btn-sm">Reject</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info text-center mt-4" role="alert">
          <i className="bi bi-exclamation-circle me-2"></i>No pending requests at the moment.
        </div>
      )}

      <div className="text-center mt-4">
        <button
          className="btn btn-secondary m-3"  
          onClick={() => toPage("/adminHomePage")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Notification;
