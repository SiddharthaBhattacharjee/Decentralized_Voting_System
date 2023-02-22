import './App.css';
import metamaskimg from './images/metamask.png';
import React, {useState, useEffect} from 'react';
import { VoteContractAddress } from './config.js';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import VoteAbi from './utils/VoteContract.json';
import OwnerPart from './components/OwnerPart';

function App() {

  const [currentAccount, setCurrentAccount] = useState('');
  const [correctNetwork, setCorrectNetwork] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isVoter, setIsVoter] = useState(false);
  const [isVotingEnabled, setIsVotingEnabled] = useState(false);
  const [voted, setVoted] = useState(false);

  const connectWallet = async () => {
    try{
      const {ethereum} = window;
      if(!ethereum){
        alert('Metamask Not Found ! Get MetaMask and Try Again.');
        return;
      }

      let chainId = await ethereum.request({method: 'eth_chainId'});

      const shardeumChainId = '0x1f91';
      console.log(chainId);
      if(chainId !== shardeumChainId){
        alert('Please Connect to shardeum Testnet');
        return;
      }
      else{
        setCorrectNetwork(true);
      }

      const accounts = await ethereum.request({method: 'eth_requestAccounts'});
      setCurrentAccount(accounts[0]);
      console.log('Connected', accounts[0]);
    } catch(error){
      console.log(error);
    }
  }

  const checkOwner = async () => {
    try{
      const {ethereum} = window;
      if(ethereum){
        //setting up provider
        const provider = new Web3Provider(ethereum);
        const signer = provider.getSigner();
        console.log('signer : ',signer);
        const VoteContract = new ethers.Contract(VoteContractAddress, VoteAbi.abi, signer);
        console.log('VoteContract : ',VoteContract);
        //calling the smart contract
        let isownercheck = await VoteContract.isOwner();
        console.log('isowner : ',isownercheck);
        setIsOwner(isownercheck);
      }
      else{
        console.log('Ethereum object not found');
      }
    }catch(error){
      console.log(error);
    }
  }

  const toggleisve = async () => {
    try{
      const {ethereum} = window;
      if(ethereum){
        //setting up provider
        const provider = new Web3Provider(ethereum);
        const signer = provider.getSigner();
        console.log('signer : ',signer);
        const VoteContract = new ethers.Contract(VoteContractAddress, VoteAbi.abi, signer);
        console.log('VoteContract : ',VoteContract);
        //calling the smart contract
        VoteContract.toggleVotingEnabled().then(
          response => {
            setIsVotingEnabled(!isVotingEnabled);
            console.log('toggleVotingEnabled : ',response);
            
          }
        ).catch(err => {
          console.log(err);
        });
        
      }
      else{
        console.log('Ethereum object not found');
      }
    }catch(error){
      console.log(error);
    }
  }


  useEffect(()=>{
    connectWallet();
    checkOwner();
  }, []);

  const Register = async () => {
    window.open('https://metamask.io', '_blank');
  }

  return (
    <div>
      {currentAccount === '' ? (
          <div className="loading" style={{width:"100%",height:"100vh",display:'flex',alignItems:"center", justifyContent:"space-evenly",flexDirection:"column"}}>
            <div style={{display:'flex',alignItems:"center", justifyContent:"center",flexDirection:"column"}}>
              <div className="Metabit">VoteChain</div>
              <div className="SubMetabit">Voting made easy with Blockchain</div>
            </div>
            <div style={{display:'flex',alignItems:"center", justifyContent:"center",flexDirection:"column", textAlign:"center"}}>
              <div className='connectWalletButton' onClick={connectWallet}>
                Login With <img src={metamaskimg} alt="metamask"/> MetaMask
              </div>
              <div className="SubConnectWallet" onClick={Register}>Register</div>
            </div>
          
          </div>
          ) : !correctNetwork ? (
            <div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'>
              <div>-----------------------------------------</div>
              <div>Please connect to the shardeum Testnet</div>
              <div>and reload the page</div>
              <div>-----------------------------------------</div>
            </div>
          ) : (
          isOwner ? (
            <div className='ownerdiv' style={{width:"100%",height:"100vh"}}>
              <OwnerPart isVE={isVotingEnabled} toggleIsVE={toggleisve}/>
            </div>
          ): isVoter ? (
            <div> Voter </div>
          ) : (
            <div> Not Registered </div>
          )
        )}
    </div>
  );
}

export default App;
