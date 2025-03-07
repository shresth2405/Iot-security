// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract IoTAccessControl {
    struct Device {
        address owner;
        bool isRegistered;
    }

    mapping(bytes32=> Device) public devices;

    event DeviceRegistered(bytes32 deviceId, address owner);
    event DeviceLoggedIn(bytes32 deviceId, address owner);
    event DeviceUnregistered(bytes32 deviceId);

    function registerDevice(bytes32 deviceId) public {
       
        require(!devices[deviceId].isRegistered, "Device already registered");
        devices[deviceId] = Device(msg.sender, true); // Correct struct assignment
        emit DeviceRegistered(deviceId, msg.sender);
        // emit DebugLog("Device registered successfully", key, devices[key].isRegistered);
    }

    function isDeviceRegistered(bytes32 deviceId) public view returns (bool) {
        return devices[deviceId].isRegistered;
    }

    function getDeviceOwner(bytes32 deviceId) public view returns (address) {
    return devices[deviceId].owner;
    }

    function loginDevice(bytes32 deviceId) public returns (bool) {
        require(devices[deviceId].isRegistered, "Device not registered");
        require(devices[deviceId].owner == msg.sender, "Not the owner");
        emit DeviceLoggedIn(deviceId, msg.sender);
        return true;
    }

    function unregisterDevice(bytes32 deviceId) public {
        require(devices[deviceId].isRegistered, "Device not registered");
        require(devices[deviceId].owner == msg.sender, "Not the owner"); // isko thik kerna pdega
        
        delete devices[deviceId]; // Remove the device from mapping
        emit DeviceUnregistered(deviceId);
    }

}

