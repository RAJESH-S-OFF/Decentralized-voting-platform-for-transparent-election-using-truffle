import Web3 from 'web3';
import Voting from './contracts/Voting2.json'; 


export const getVotingContract = async () => {
    const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:7545',{
        timeout: 120000 // Timeout in milliseconds (120 seconds)
    });
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Voting.networks[networkId];
    const contract = new web3.eth.Contract(Voting.abi, deployedNetwork.address);
    return contract;
};
