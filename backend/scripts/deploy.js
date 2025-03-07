async function main() {
    const IoTAccessControl = await ethers.getContractFactory("IoTAccessControl");
    const contract = await IoTAccessControl.deploy();
    await contract.waitForDeployment();
    console.log("Contract address:", contract.target);
    console.log("Contract deployed at:", await contract.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
