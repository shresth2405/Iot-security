const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("IoTAccessControlModule", (m) => {
  const contract = m.contract("IoTAccessControl");  // Replace with your contract name
  return { contract };
});