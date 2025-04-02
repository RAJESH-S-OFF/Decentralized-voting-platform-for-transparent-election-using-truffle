// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        string location;
        string party;
        uint256 voteCount;
    }

    Candidate[] public candidates;
    address owner;
    mapping(address => bool) public voters;
    mapping(bytes32 => bool) private candidateHashes;

    uint256 public votingStartTime;
    uint256 public votingEndingTime;

    constructor(
        string[] memory _candidateNames,
        string[] memory _candidateLocation,
        string[] memory _candidateParty,
        uint256 _durationInMinutes
    ) {
        for (uint256 i = 0; i < _candidateNames.length; i++) {
            bytes32 candidateHash = keccak256(abi.encodePacked(_candidateNames[i], _candidateLocation[i], _candidateParty[i]));
            require(!candidateHashes[candidateHash], "Duplicate candidate detected");

            candidateHashes[candidateHash] = true;
            candidates.push(
                Candidate({
                    name: _candidateNames[i],
                    location: _candidateLocation[i],
                    party: _candidateParty[i],
                    voteCount: 0
                })
            );
        }
        votingStartTime = block.timestamp;
        votingEndingTime = block.timestamp + (_durationInMinutes * 60);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }

    function login() public view returns (bool) {
        return msg.sender == owner;
    }

    function setVotingStartTime(
        uint256 startTime,
        uint256 endTime
    ) public onlyOwner {
        votingStartTime = startTime;
        votingEndingTime = endTime;
    }

    function addCandidate(
        string memory _name,
        string memory _location,
        string memory _party
    ) public onlyOwner {
        require(!(block.timestamp >= votingStartTime && block.timestamp <= votingEndingTime), "Election already started");

        bytes32 candidateHash = keccak256(abi.encodePacked(_name, _location, _party));
        require(!candidateHashes[candidateHash], "Candidate already exists");

        candidateHashes[candidateHash] = true;
        candidates.push(
            Candidate({
                name: _name,
                location: _location,
                party: _party,
                voteCount: 0
            })
        );
    }

function editCandidate(
    string memory _name,
    string memory _location,
    string memory _party,
    string memory _newName,
    string memory _newLocation,
    string memory _newParty
) public onlyOwner {
    require(!(block.timestamp >= votingStartTime && block.timestamp <= votingEndingTime), "Election already started");

    // hash for the existing candidate
    bytes32 candidateHash = keccak256(abi.encodePacked(_name, _location, _party));
    require(candidateHashes[candidateHash], "Candidate not found");

    for (uint256 i = 0; i < candidates.length; i++) {
        if (
            keccak256(abi.encodePacked(candidates[i].name, candidates[i].location, candidates[i].party)) == candidateHash
        ) {
            // Update
            candidates[i].name = _newName;
            candidates[i].location = _newLocation;
            candidates[i].party = _newParty;

            // Remove the old hash and add the new one
            candidateHashes[candidateHash] = false;
            bytes32 newCandidateHash = keccak256(abi.encodePacked(_newName, _newLocation, _newParty));
            candidateHashes[newCandidateHash] = true;
            
            break;
        }
    }
}



    function deleteCandidate(
        string memory _name,
        string memory _location,
        string memory _party
    ) public onlyOwner {
        require(!(block.timestamp >= votingStartTime && block.timestamp <= votingEndingTime), "Election already started");

        bytes32 candidateHash = keccak256(abi.encodePacked(_name, _location, _party));
        require(candidateHashes[candidateHash], "Candidate not found");

        candidateHashes[candidateHash] = false;

        for (uint256 i = 0; i < candidates.length; i++) {
            if (
                keccak256(abi.encodePacked(candidates[i].name, candidates[i].location, candidates[i].party)) == candidateHash
            ) {
                candidates[i] = candidates[candidates.length - 1];
                candidates.pop();
                break;
            }
        }
    }

    function vote(uint256 _candidateIndex) public {
        require(block.timestamp >= votingStartTime, "Election not started");
        require(block.timestamp <= votingEndingTime, "Election ended");
        require(!voters[msg.sender], "You have already voted.");
        require(_candidateIndex < candidates.length, "Invalid candidate index.");

        candidates[_candidateIndex].voteCount++;
        voters[msg.sender] = true;
    }

    function hasVoted() public view returns (bool) {
        return voters[msg.sender];
    }

    function getAllVotesOfCandiates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function isOnGoing() public view returns (bool) {
        return block.timestamp >= votingStartTime && block.timestamp <= votingEndingTime;
    }
}
