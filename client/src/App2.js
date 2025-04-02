import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVotingContract } from "./VotingContract";
import Header from "./Header";
import About from "./About";
import Body from "./Body";
import  Notification  from "./Notification";
import Results from "./Results";
import Vote from "./Vote";
import Footer from "./Footer";
import Admin from "./Admin";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminLoginPage from "./AdminLoginPage";
import AdminHomePage from "./AdminHomePage";
import AddCandidate from "./AddCandidate";
import DeleteCandidate from "./DeleteCandidate";
import SetVotingTime from "./SetVotingTime";
import RegisterVote from "./RegisterVote";
import EditCandidate from "./EditCandidate";
import RegisterCandidate from "./RegisterCandidate";
import UserLogin from "./UserLogin";
import Profile from "./Profile";
import Loading from "./Loading";
import EditVoter from "./EditVoter";
import DeleteVoter from "./DeleteVoter";

const App2 = () => {
  const navigate = useNavigate();
  const [votingList,setVotingList]=useState([]);
  const [user,setUser]=useState({})
  const[userAadhaar_no,setUserAadhaar_no]=useState('all');
  const[resultList,setResultList]=useState([]);
  const [candidates, setCandidates] = useState([]);
  const [loginStatus,setLoginStatus]=useState(false);
  const [count,setCount]=useState(0);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadContract = async () => {
        try {
            const contract = await getVotingContract();
            await loadContractData(contract, "all");
            console.log("Load contract stage: Candidates data:", resultList); 
        } catch (error) {
            console.error("Load Contract stage: Error loading contract:", error);
        }
    };
    loadContract();
    toPage("/");
    
}, []); 

useEffect(() => {
  axios
    .get("http://localhost:5000/users")
    .then((response) => {
      setUsers(response.data); 
      
    })
    .catch((error) => {
      console.error("Database fetching stage :Error fetching users:", error); 
    });
    setCount(users.length)
    console.log(1);
    
}, [navigate]);


useEffect(() => {
  setCount(users.length); 
}, [users]);


useEffect(() => {
  console.log("Updated Result List1:", resultList);
}, [resultList]);

const getAccounts = async () => {
    try {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        return accounts[0];
    } catch (error) {
        console.log("Error getting accounts:", error);
    }
};

const loadContractData = async (contract, userAadhaar_no) => {
    try {
        const candidatesData = await contract.methods
            .getAllCandidates(userAadhaar_no)
            .call();
        
        const formattedCandidates = candidatesData.map((candidate) => ({
            name: candidate.name,
            aadhaar_no: candidate.aadhaar_no,
            location: candidate.constituency,
            party: candidate.party,
            voteCount: Number(candidate.voteCount),
        }));
        
        setVotingList(formattedCandidates); 

        const rescandidatesData = await contract.methods
            .getAllCandidates("all")
            .call();

        const resformattedCandidates = rescandidatesData.map((candidate) => ({
            name: candidate.name,
            location: candidate.constituency,
            party: candidate.party,
            voteCount: Number(candidate.voteCount),
        }));

        setCandidates(formattedCandidates); 

        console.log("Updated Result List:", resformattedCandidates); 
        setResultList(resformattedCandidates); 
        
        if (Object.keys(user).length !== 0) {
          const tx = await contract.methods
              .getPersonByAadhaar_noAndPassword(user.aadhaar_no, user.password)
              .call();
         // console.log(tx);
         const y={...tx};
          setUser((prev)=>y);
      }
      


    } catch (error) {
        console.log("Loading Contract Data stage:" + JSON.stringify(error, null, 2));
    }
};


  // Voting function
  const vote = async (index) => {
    try {
      const contract = await getVotingContract();
      if (typeof window.ethereum === "undefined") {
        alert("Please install MetaMask to use this feature");
        return;
      }
      const account = await getAccounts();
      const date=new Date(Date.now());
      await contract.methods.vote(userAadhaar_no,index).send({ from: account,gas:100000000});
      alert("Vote cast successfully!");
      await loadContractData(contract,userAadhaar_no);
      sendMail(user.email,user.name,"You have votted  using this Aadhar Number("+ user.aadhaar_no+") at "+date.toLocaleString());
    } catch (error) {
      const errorMessage = error?.cause?.message || "Connect Metamask";
      console.log("Voting Stage:"+JSON.stringify(error, null, 2));

      if (errorMessage.includes("Already voted")) {
        alert("You are Already voted");
      } else if (errorMessage.includes("Candidate not found")) {
        alert("Candidate not found");
      } else if (errorMessage.includes("Election not started"))
        alert("Election not started");
      else if (errorMessage.includes("Election ended")) alert("Election ended");
      else {
        alert(errorMessage);
      }
    }
  };
  async function addCandidate(name,password,aadhaar_no,email,location,constituency,party,role,status) {
    try {
      const contract = await getVotingContract();
      const account = await getAccounts();
      const tx = await contract.methods
          .addCandidate(aadhaar_no.trim(),constituency.trim().toUpperCase(), party.trim().toUpperCase())
          .send({ from: account, gas: 10000000 });
      
      alert("Candidate successfully Added!");

      await loadContractData(contract, user.aadhaar_no ? user.aadhaar_no : "all");
      return 1;

  } catch (error) {
      const errorMessage =
        error?.cause?.message || error?.message || "Connect Metamask";
      console.log("Adding Candidate Stage:"+JSON.stringify(error));

      if (errorMessage.includes("Election already started")) {
        alert("Election already started");
      } else if (errorMessage.includes("Candidate already exists")) {
        alert("Candidate already exists");
      } else {
        alert("An error occurred. Please try again.");
      }
      return 0;
    }
  }

  async function addVoter(name,password,aadhaar_no,email,location,constituency,party,role,status) {
    try {
      const contract = await getVotingContract();
      const account = await getAccounts();
      const tx = await contract.methods
          .addPerson(name.trim().toUpperCase(),password.trim(),aadhaar_no.trim(),email.trim(),location.trim().toUpperCase())
          .send({ from: account, gas: 10000000 });
      
      alert("Voter successfully Added!");

      await loadContractData(contract, user.aadhaar_no ? user.aadhaar_no : "all");
      return 1;

  } catch (error) {
      const errorMessage =
        error?.cause?.message || error?.message || "Connect Metamask";
      console.log("Voter adding Process:"+JSON.stringify(error));

      if (errorMessage.includes("Election already started")) {
        alert("Election already started");
      } else if (errorMessage.includes("Person already exists")) {
        alert("Voter already exists");
      } else {
        alert("An error occurred. Please try again.");
      }
      return 0;
    }
  }

  async function editCandidate(name,password,aadhaar_no,email,location,constituency,party,role,status) {
    try {
      const contract = await getVotingContract();
      const account = await getAccounts();
       const tx = await contract.methods
        .editCandidate(aadhaar_no.trim(),constituency.trim().toUpperCase(),party.trim().toUpperCase())
        .send({ from: account, gas: 50000000 });
      alert("Candidate successfully Modified!");
      await loadContractData(contract, user.aadhaar_no ? user.aadhaar_no : "all"); 
      return 1;
    }
    
    catch (error) {
      const errorMessage =
        error?.cause?.message || error?.message || "Connect Metamask";
      console.log("Edit Candidate Stage:"+JSON.stringify(error,null,2)); //JSON.stringify(error));

      if (errorMessage.includes("Election already started")) {
        alert("Election already started");
      }
      else if(errorMessage.includes("Candidate not found"))
          alert("Candidate not found");
       else {
        alert("1An error occurred. Please try again.");
      }
      return 0;
    }
  }

  async function editVoter(name,password,aadhaar_no,email,location,constituency,party,role,status) {
    try {
      const contract = await getVotingContract();
      const account = await getAccounts();
      const tx = await contract.methods
          .editPerson(name.trim().toUpperCase(),password.trim(),aadhaar_no.trim(),email.trim(),location.trim().toUpperCase())
          .send({ from: account, gas: 10000000 });
     
      alert("Voter successfully Edited!");
      console.log("hi");
      await loadContractData(contract, user.aadhaar_no ? user.aadhaar_no : "all");
     console.log("hii")
     return 1;

  } catch (error) {
      const errorMessage =
        error?.cause?.message || error?.message || "Connect Metamask";
      console.log("Voter info editing  Process:"+JSON.stringify(error));

      if (errorMessage.includes("Election already started")) {
        alert("Election already started");
      } else if (errorMessage.includes("Person not found.")) {
        alert("Voter does not exist");
      } else {
        alert("An error occurred. Please try again.");
      }
      return 0;
    }
  }


  async function deleteCandidate(name,password,aadhaar_no,email,location,constituency,party,role,status) {
    try {
      const contract = await getVotingContract();
      const account = await getAccounts();
      console.log(aadhaar_no);
      const tx = await contract.methods
        .deleteCandidate(aadhaar_no.trim())
        .send({ from: account, gas: 10000000 });
      alert("Candidate successfully Deleted!");
      await loadContractData(contract, user.aadhaar_no ? user.aadhaar_no : "all");
      return 1;
    } catch (error) {
      const errorMessage =
        error?.cause?.message || error?.message || "Connect Metamask";
      console.log( "Deleting Candidate Stage:"+ JSON.stringify(error,null,2));

      if (errorMessage.includes("Election already started")) {
        alert("Election already started");
      } 
       else {
        alert("An error occurred. Please try again.");
      }
      return 0;
    }
  }

  async function deleteVoter(name,password,aadhaar_no,email,location,constituency,party,role,status) {
    try {
      const contract = await getVotingContract();
      const account = await getAccounts();
      console.log(aadhaar_no);
      const tx = await contract.methods
        .deletePerson(aadhaar_no.trim())
        .send({ from: account, gas: 10000000 });
      alert("Voter successfully Deleted!");
      await loadContractData(contract, user.aadhaar_no ? user.aadhaar_no : "all");
      return 1;
    } catch (error) {
      const errorMessage =
        error?.cause?.message || error?.message || "Connect Metamask";
      console.log("Voter removal process;"+JSON.stringify(error,null,2));

      if (errorMessage.includes("Election already started")) {
        alert("Election already started");
      } 
      else if(errorMessage.includes("Person not found.Candidate not found.")){
        alert("Voter does not exist");
      }
       else {
        alert("An error occurred. Please try again.");
      }
      return 0;
    }
  }


  async function setVotingTimes(stTime, endTime, e) {
    e.preventDefault(); console.log(1);
    
    try {
      stTime= new Date(stTime).getTime() / 1000; 
       endTime = new Date(endTime).getTime() / 1000; 
      
      const contract = await getVotingContract();
      
      const account = await getAccounts();
      
      if (!account || account.length === 0) {
        alert("Please connect your wallet.");
        return;
      }
      const tx = await contract.methods
        .setVotingTimes(stTime, endTime)
        .send({ from: account, gas: 20000000 });
  
      console.log("Voting time successfully changed!");
  
      alert("Voting time successfully changed!");
    } catch (error) {
      console.log("Voting Time Change Process:"+JSON.stringify(error,null,2))
      alert(error.message || "An error occurred while setting voting time.");
    }
  }
  
  function toPage(e) {
    navigate(e);
    console.log("Page Redirect Stage:"+e);
  }

  async function login() {
    try {
      const contract = await getVotingContract();
      if (typeof window.ethereum === "undefined") {
        alert("Please install MetaMask to use this feature.");
        return;
      }
      const account = await getAccounts();

      const isOwner = await contract.methods.checkOwner().call({ from: account });
      if (isOwner) {
        alert(" Admin Login successful\nAccouunt:" + account);
        navigate("/adminHomePage");
      } else {
        alert("Login failed: You are not the Admin\nAccount:" + account);
      }
      // await loadContractData(contract);
    } catch (error) {
      console.log("Admin Login Process:"+JSON.stringify(error, null, 2));
    }
  }
  

   function userLogin(){
    if (loginStatus) {
      setLoginStatus(false);
      toPage("/");
      window.location.reload();
    } else {
      toPage("/userlogin")
    }
  }
  async function handleAppLoginSubmit(aadhaar_no,password,e) {
    e.preventDefault();
    if(aadhaar_no.length!=12){
        alert("Check Aadhar Number");return;}
    try {
      const contract = await getVotingContract();
      const tx = await contract.methods
        .getPersonByAadhaar_noAndPassword(aadhaar_no.trim(),password.trim())
        .call();
      setUser(tx);
      console.log(tx.name+"\n"+user.name);
      alert("Login successfully");
      toPage("/");
      setLoginStatus(true);
      setUserAadhaar_no(aadhaar_no);
      await loadContractData(contract,aadhaar_no);
    } catch (error) {
      const errorMessage =
        error?.cause?.message || error?.message || "Connect Metamask";
      console.log("User Login Stage:"+error);

      if (errorMessage.includes("Aadhaar no does not exist")) {
        alert("Aadhaar no does not exist");
      } else if (errorMessage.includes("Aadhaar and password credentials are not matched")) {
        alert("Aadhaar and password credentials are not matched");
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  }
  function sendMail(email,name,msg){
    axios.post("http://localhost:5000/send-email", {
      email: email,
      name: name,
      message:msg
    })
    .then((response) => {
      alert("Email sent successfully!");
    })
    .catch((error) => {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    }); 
  }
  const functionMap = {
     "Voter-add": addVoter,
    "Voter-delete": deleteVoter,
    "Voter-edit": editVoter, 
    "Candidate-add": addCandidate,
    "Candidate-delete": deleteCandidate,
    "Candidate-edit": editCandidate
  };
  async function handleAccept(name,password,aadhaar_no,email,location,constituency,party,role,status){
      const functionKey = `${role}-${status}`;
      const res=await functionMap[functionKey](name,password,aadhaar_no,email,location,constituency,party,role,status);
      console.log(res);
      if(res==1){
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
            sendMail(email,name,"You have submitted a request using this "+ aadhaar_no+" to "+status+" "+role +" details was Accepted");
          })
          .catch(error => {
            console.error("Deleting user from database Stage:", error.response ? error.response.data.message : error.message);
          });
      }
      
  }
 

    async function forgetPassword(input,e){
      e.preventDefault();
      if(input==''){
          alert("Fill Aadhar input Field");return;}
      try {
        const contract = await getVotingContract();
        const tx = await contract.methods
         .getEmail(input.trim())
         .call();
         sendMail(tx[0],`user,{Aadhar No:${input}}`,"Your  Password is "+tx[1]+"\nDont share to anyone");
        alert("Check your mail which is configured with your Aadhar number") 
        toPage("/userLogin");
        await loadContractData(contract,"all"); 
      } catch (error) {
        const errorMessage =
          error?.cause?.message || error?.message || "Connect Metamask";
        console.log("Forget Password Stage:"+JSON.stringify(error,null,2));
  
        if (errorMessage.includes("This Aadhaar user is not registered for voting")) {
          alert("This Aadhaar user is not registered for voting");
        }  
        else if(errorMessage.includes("Person not found")||errorMessage.includes("Candidate not found"))
            alert("Aadhar number does not exist");
        else {
          alert("An error occurred. Please try again.");
        }
      }
    }
    function check(aadhaar_no,password, name, age, email, location, constituency,party) {
        axios.get(`http://localhost:8080/people/${aadhaar_no}`)
          .then((response) => {
            if (
              name !== response.data.name ||
              age !== response.data.age ||
              email !== response.data.email ||
              location !== response.data.address ||
              constituency !== response.data.constituency
              
            ) {
              //editVoter(response.name,password,aadhaar_no,response.email,response.location,response.constituency,party,"Voter","edit")
              alert("Sucessfully Checked  and Updated");
            } else {
              console.log("Data are upto date with aadhar");
            }
          })
          .catch((error) => {
            console.error("Fetching users from database Process:", error);
          });
      }

  return (
    <div  >
    <Header  className="header"loginStatus={loginStatus} setLoginStatus={setLoginStatus}  userLogin={userLogin}/>

    <div  className="container">
      <Routes>
        <Route path="/" element={<Body toPage={toPage} />} />
        <Route path="/about" element={<About toPage={toPage} loginStatus={loginStatus} />} />
        <Route path="/vote" element={<Vote votingList={votingList} vote={vote} user={user}/>} />
        <Route path="/results"  element={resultList.length ? <Results resultList={resultList} /> : <Loading/>} />
        <Route path="/adminlogin" element={<AdminLoginPage resultList={resultList} login={login} />} />
        <Route path="/admin" element={<Admin resultList={resultList} />} />
        <Route path="/profile" element={<Profile  user={user}  setUser={setUser} toPage={toPage} check={check}/>} />
        <Route path="/adminHomePage" element={<AdminHomePage resultList={resultList} count={count} />} />
        <Route path="/addCandidate" element={<AddCandidate user={user} toPage={toPage} />} />
        <Route path="/deleteCandidate" element={<DeleteCandidate  user={user} toPage={toPage}  />} />
        <Route path="/editCandidate" element={<EditCandidate  user={user} toPage={toPage}  />} />
        <Route path="/setVotingTime" element={<SetVotingTime  toPage={toPage} setVotingTimes={setVotingTimes} />} />
        <Route path="/registerVote" element={<RegisterVote  toPage={toPage} />} />
        <Route path="/registerCandidate" element={<RegisterCandidate />} />
        <Route path="/notification" element={<Notification users={users} setUsers={setUsers} toPage={toPage} handleAccept={handleAccept} count ={users.length}setCount={setCount} sendMail={sendMail}/>} />
        <Route path="/userlogin" element={<UserLogin setLoginStatus={setLoginStatus} handleAppLoginSubmit={handleAppLoginSubmit} forgetPassword={forgetPassword}/>} />
        <Route path="/editvoter" element={<EditVoter user={user} toPage={toPage} setLoginStatus={setLoginStatus} handleAppLoginSubmit={handleAppLoginSubmit}/>} />
        <Route path="/deletevoter" element={<DeleteVoter user={user}  toPage={toPage} setLoginStatus={setLoginStatus} handleAppLoginSubmit={handleAppLoginSubmit}/>} />
      </Routes>
    </div>

    <Footer className="header" />
  </div>
  );
};

export default App2;
