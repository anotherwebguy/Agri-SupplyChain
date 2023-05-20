// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract Payment {
    address owner;
    mapping(uint => uint) status;

    constructor() {
        owner = msg.sender;
    }

    function Deposit() public payable returns (bool) {
        payable(msg.sender).transfer(msg.value);
        return true;
    }

    function updateStatus(uint id) public returns (bool) {
        status[id] += 1;
        return true;
    }

    function getStatus(uint id) public view returns (uint) {
        uint id1 = status[id];
        return id1;
    }

    receive() external payable {}
}
