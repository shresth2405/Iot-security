const hre = require("hardhat");
const { keccak256, toUtf8Bytes } = require("ethers");

async function main() {
    const contractAddress = "0x1f85897aCaf2485AD8EFD0364efd03E1510680d1"; // Replace with your deployed address

    // console.log(code);

    const IoTAccessControl = await hre.ethers.getContractFactory("IoTAccessControl");
    const contract = await IoTAccessControl.attach(contractAddress);

    // Register an IoT device
    const deviceId = "device-145"; // Unique ID for the device
    const hashedDeviceId = keccak256(toUtf8Bytes(deviceId));
    const tx = await contract.registerDevice(hashedDeviceId);
    await tx.wait(); // Wait for transaction confirmation

    console.log(`Device "${deviceId}" registered successfully!`);

    // Check if the device is registered
    // console.log(deviceId);
    const isRegistered = await contract.isDeviceRegistered(hashedDeviceId);
    console.log(`Is "${deviceId}" registered?`, isRegistered);

    const isLogin= await contract.loginDevice(hashedDeviceId)
    await isLogin.wait();

    console.log(`Device ${deviceId} logged in successfully`);
    
    
    const isUnregister= await contract.unregisterDevice(hashedDeviceId)
    await isUnregister.wait();

    console.log(`Device ${deviceId} unregistered successfully`);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
