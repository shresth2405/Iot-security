"use client"

import React, { useEffect, useState } from 'react'
import { ethers } from "ethers";
import { keccak256, toUtf8Bytes } from "ethers";
import { BrowserProvider, Contract } from "ethers";

const contractAddress = "0x1f85897aCaf2485AD8EFD0364efd03E1510680d1"; // Replace with deployed address
const abi = [ // Contract ABI (only include needed functions)
    "function registerDevice(bytes32 deviceId) public",
    "function isDeviceRegistered(bytes32 deviceId) public view returns (bool)",
    "function getDeviceOwner(bytes32 deviceId) public view returns (address)",
    "function loginDevice(bytes32 deviceId) public returns (bool)",
    "function unregisterDevice(bytes32 deviceId) public ",
];
const LoginDevice = () => {
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);
    const [deviceId, setDeviceId] = useState("");
    const [key, setKey] = useState();
    const [status, setStatus] = useState("");

    const logindevice = async()=>{
        try {
          if (!window.ethereum) throw new Error("MetaMask not installed");
    
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(contractAddress, abi, signer);
    
          setKey(keccak256(toUtf8Bytes(deviceId)));
    
        //   console.log(contract);
        //   const owner=await contract.isDeviceRegistered(key);
        //   console.log(owner);
    
          const tx = await contract.loginDevice(key);
          await tx.wait(); // Wait for transaction to confirm
    
          setStatus(`Device ${deviceId} logged in successfully!`);
    
        } catch (error) {
          setStatus(`Error: ${error.message}`);
        }
      }

    return (
        <div>
            <h2>Login Device</h2>
            <input
                type="text"
                placeholder="Enter Device ID"
                value={deviceId}
                onChange={(e) => setDeviceId(e.target.value)}
            />
            <button onClick={logindevice}>Login</button>
            <p>{status}</p>
        </div>
    )
}

export default LoginDevice
