"use client"; 

import { useState, useEffect } from "react";
import { keccak256, toUtf8Bytes } from "ethers"; 
import { BrowserProvider, Contract } from "ethers";

const contractAddress = "0x1f85897aCaf2485AD8EFD0364efd03E1510680d1";
const abi = [
  "function isDeviceRegistered(bytes32 deviceId) public view returns (bool)"
];

export default function DeviceStatus() {
  const [key,setKey]= useState(null);
  const [deviceId, setDeviceId] = useState("");
  const [isRegistered, setIsRegistered] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Ensure this runs only in the browser
    if (typeof window !== "undefined" && window.ethereum) {
      const loadProvider = async () => {
        try {
            const provider = new BrowserProvider(window.ethereum);
            const contract = new Contract(contractAddress, abi, provider);

          setProvider(provider);
          setContract(contract);
        } catch (err) {
          // console.error("Provider Error:", err);
          setError("⚠️ Unable to connect to MetaMask. Make sure it's installed.");
        }
      };

      loadProvider();
    }
  }, []);

  const checkStatus = async () => {
    try {
      if (!contract) throw new Error("Contract is not initialized");
      if (!deviceId) throw new Error("Please enter a valid device ID");

      // console.log("Checking status for device:", deviceId);
      // console.log(await contract.getAddress())

      // console.log(deviceId);
      // console.log(contract);
      // console.log(contract.interface);
      // console.log(contract.interface.functions);

      setKey(keccak256(toUtf8Bytes(deviceId)));
    //   console.log(contract.interface.format(ethers.utils.FormatTypes.json));



    //   console.log("Checking for contract:",await contract.isDeviceRegistered(deviceId));

      const result = await contract.isDeviceRegistered(key);
      // console.log(result);
      setIsRegistered(result);
      setError(""); // Clear any previous errors
    } catch (error) {
      console.error("Error:", error);
      setError(`❌ yhi hai na ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Check Device Status</h2>
      <input
        type="text"
        value={deviceId}
        onChange={(e) => setDeviceId(e.target.value)}
        placeholder="Enter Device ID"
      />
      <button onClick={checkStatus} disabled={!contract}>
        Check
      </button>

      {isRegistered !== null && (
        <p>{isRegistered ? "✅ Device is registered" : "❌ Device is NOT registered"}</p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
