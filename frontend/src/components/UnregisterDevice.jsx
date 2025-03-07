"use client"

import React, { useState } from 'react'
import { ethers } from "ethers";
import { keccak256, toUtf8Bytes } from "ethers";

const UnregisterDevice = () => {
    const contractAddress = "0x1f85897aCaf2485AD8EFD0364efd03E1510680d1"; // Replace with deployed address
    const abi = [ // Contract ABI (only include needed functions)
        "function registerDevice(bytes32 deviceId) public",
        "function isDeviceRegistered(bytes32 deviceId) public view returns (bool)",
        "function getDeviceOwner(bytes32 deviceId) public view returns (address)",
        "function unregisterDevice(bytes32 deviceId) public",
        "function loginDevice(bytes32 deviceId) public returns (bool)"
    ];

    const [deviceId, setDeviceId] = useState("");
    const [key, setKey] = useState();
    const [message, setMessage] = useState("");


    const unregisterDevice = async () => {
        if (!window.ethereum) {
            setMessage("Please install MetaMask.");
            return;
        }

        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, abi , signer);

            setKey(keccak256(toUtf8Bytes(deviceId)));
            const tx = await contract.unregisterDevice(key);
            await tx.wait();

            setMessage(`Device ${deviceId} unregistered successfully.`);
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Unregister Device</h2>
            <input
                type="text"
                placeholder="Enter Device ID"
                value={deviceId}
                onChange={(e) => setDeviceId(e.target.value)}
            />
            <button onClick={unregisterDevice}>Unregister</button>
            {message && <p>{message}</p>}
        </div>
    );

};

export default UnregisterDevice;