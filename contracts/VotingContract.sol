// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingContract{
    struct Voter {
        string name;
        uint64 voterID; 
        uint timestamp;
        string partyName;
    }

    Voter[] voters;
    address payable  owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function registerVoter(string memory name, uint64 voterID, string memory partyName) public payable {

        // Check if Aadhar number is unique
        require(isvoterIDUnique(voterID), "VOTER ID already registered");

        // Transfer the fee to the owner
       owner.transfer(msg.value);

        // Store the voter information
        voters.push(Voter(name,voterID,block.timestamp,partyName));
}

    function isvoterIDUnique(uint64 _voterID) internal view returns (bool) {
        for (uint256 i = 0; i < voters.length; i++) {
            if (voters[i].voterID == _voterID) {
                return false;
            }
        }
        return true;
    }

    // Function to get the total number of registered voters
    function getVoters() public view returns (Voter[] memory) {
        return voters;
    }
}
