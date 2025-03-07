"use client"

import React,{useState} from 'react'
import { ethers } from "ethers";
import { keccak256, toUtf8Bytes } from "ethers";


const contractAddress = "0x52EfCfAbdfFd47081834A51dD81bCB413795fC2a"; // Replace with deployed address
const abi = [ // Contract ABI (only include needed functions)
  "function registerDevice(bytes32 deviceId) public",
  "function isDeviceRegistered(bytes32 deviceId) public view returns (bool)",
  "function getDeviceOwner(bytes32 deviceId) public view returns (address)"
];

const RegisterDevice = () => {
  const [deviceId, setdeviceId] = useState("");
  const [key,setKey]= useState();
  const [status, setStatus] = useState("");

  const registerDevice = async()=>{
    try {
      if (!window.ethereum) throw new Error("MetaMask not installed");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      setKey(keccak256(toUtf8Bytes(deviceId)));

      // console.log(contract);

      const tx = await contract.registerDevice(key);
      await tx.wait(); // Wait for transaction to confirm

      setStatus(`Device ${deviceId} registered successfully!`);
      const owner = await contract.getDeviceOwner(key);
      // console.log(`Device Owner: ${owner}`);

    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  }
  return (
    <div>
      <h2>Register Iot Devices</h2>
      <input type="text"
      name="deviceId"
      placeholder='Enter Device ID'
      id=""
       value={deviceId}
      onChange={(e) => setdeviceId(e.target.value)}
      />
      <button onClick={registerDevice}>Register</button>
      <p>{status}</p>
    </div>
  ) 
}

export default RegisterDevice



