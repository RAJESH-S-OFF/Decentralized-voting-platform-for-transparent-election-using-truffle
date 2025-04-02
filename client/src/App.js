import "./App.css";
import { useEffect, useRef, useState } from "react";
import Web3 from "web3";
import SimpleStorage from "./contracts/SimpleStorage.json";
                                                        //sample bc data store and retrieve
function App() {
  const [state, setState] = useState({ web3: null, contract: null });
  const [data, setData] = useState('');
  const inval =useRef(0);

  
  async function readData() {
    const {contract}=state;
    if (contract) {
      const fetchedData = await contract.methods.getter().call();
      setData(fetchedData.toString()); 
    }
  }
  async function sendData(){
    const {contract}=state;
    await contract.methods.setter(inval.current.value).send({from:"0x94d240A7680476C1e9FCc620a05b41b0d582047d"});
    readData();
  }

  useEffect(() => {
    const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
    async function initialize() {
      const web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();
      const deployed = SimpleStorage.networks[networkId];
      if (deployed) {
        const contract = new web3.eth.Contract(SimpleStorage.abi, deployed.address);
        setState({ web3, contract });
        const initialData = await contract.methods.getter().call();
        setData(initialData.toString()); 
      } else {
        console.error("Contract not deployed to detected network.");
      }
    }
    initialize();
  }, []);


  

  return (
    <div className="App">
      <p>Contract Data: {data}</p>
      <input type="text" ref={inval}  id="val"  placeholder="Enter the Value"   />
      <button onClick={()=>sendData()}>Change Data</button>
    </div>
  );
}

export default App;
