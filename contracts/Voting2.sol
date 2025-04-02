// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting2 {
    struct Person {
        string name;
        string password;
        string aadhaar_no;
        string email;
        string location;
        uint256 voteCount;
        string constituency;
        string party; 
    }

    address public owner;
    Person[] private people;
    Person[] public candidates;
    mapping(string => bool) public hasVoted;
    mapping(string => bool) public isCandidate;
    mapping(string => uint256) private aadhaarToIndexPerson;
    mapping(string => uint256) private aadhaarToIndexCandidate;

    uint256 public votingStartTime;
    uint256 public votingEndingTime;

    constructor() {
        owner = msg.sender;
        votingStartTime = block.timestamp;
        votingEndingTime = block.timestamp + (60 * 60);
        addPerson(
            "RAMESH",
            "Ramesh@2004",
            "123456789000",
            "2212074@nec.edu.in",
            "KOVILPATTI"
        );
        addPerson(
            "JAYA",
            "Jaya@2004",
            "987654321000",
            "2212074@nec.edu.in",
            "MADURAI"
        );
        addPerson(
            "SELVA",
            "Selva@2004",
            "789456123000",
            "2212074@nec.edu.in",
            "KOVILPATTI"
        );
        addPerson(
            "VIJAY",
            "Vijay@2004",
            "111111111111",
            "2212074@nec.edu.in",
            "CHENNAI"
        );
        addPerson(
            "SEEMAN",
            "Seeman@2004",
            "222222222222",
            "2212074@nec.edu.in",
            "CHENNAI"
        );
         addPerson(
            "Vaiko",
            "Vaiko@2004",
            "333333333333",
            "2212074@nec.edu.in",
            "CHENNAI"
        );
        addPerson(
            "Dhinakaran",
            "Dhinakaran@2004",
            "444444444444",
            "2212074@nec.edu.in",
            "CHENNAI"
        );
        addCandidate("111111111111", "CHENNAI", "TVK");
        addCandidate("222222222222", "CHENNAI", "NTK");
        addCandidate("333333333333", "CHENNAI", "MDMK");
        addCandidate("444444444444", "KOVILPATTI", "AMMK");
        
    }

    function addCandidate(
        string memory _aadhaar_no,
        string memory _location,
        string memory _party
    ) public onlyOwner {
        require(
            block.timestamp < votingStartTime ||
                block.timestamp > votingEndingTime,
            "Election already started"
        );
        require(!isCandidate[_aadhaar_no], "Candidate already exists");

        // Access the person directly in the mapping and update candidate details
        uint256 personIndex = aadhaarToIndexPerson[_aadhaar_no]-1;
        Person storage p = people[personIndex];
        p.constituency = _location;
        p.party = _party;
        p.voteCount = 0;
        isCandidate[_aadhaar_no] = true;
        candidates.push(p);
        aadhaarToIndexCandidate[_aadhaar_no]=candidates.length;
      
    }

     function getIndex(string memory _a) public view returns (uint256 ) {
        
       return aadhaarToIndexPerson[_a];        
    }
    function editCandidate(
        string memory _aadhaar_no,
        string memory _location,
        string memory _party
    ) public onlyOwner {
        require(
            block.timestamp < votingStartTime ||
                block.timestamp > votingEndingTime,
            "Election already started"
        );
        require(aadhaarToIndexPerson[_aadhaar_no]!=0,"zerooo");
        uint256 personIndex = aadhaarToIndexPerson[_aadhaar_no]-1;
        Person storage p = people[personIndex];
        p.constituency = _location;
        p.party = _party;
        require(aadhaarToIndexCandidate[_aadhaar_no]!=0,"zerooo");
         uint256 cIndex = aadhaarToIndexCandidate[_aadhaar_no]-1;
        Person storage p2 = candidates[cIndex];
        p2.constituency = _location;
        p2.party = _party;

    }

    function deleteCandidate(string memory _aadhaar_no) public onlyOwner {
        require(
            block.timestamp < votingStartTime ||
                block.timestamp > votingEndingTime,
            "Election already started"
        );
        uint256 personIndex = aadhaarToIndexPerson[_aadhaar_no]-1;
        Person storage p = people[personIndex];
        uint256 index = aadhaarToIndexCandidate[_aadhaar_no]-1;
        candidates[index] = candidates[candidates.length - 1];
        aadhaarToIndexCandidate[candidates[candidates.length-1].aadhaar_no]=index+1;
        candidates.pop();

        p.constituency = "";
        p.party = "";
        p.voteCount = 0;
        delete aadhaarToIndexCandidate[_aadhaar_no];
        isCandidate[_aadhaar_no] = false;
    }

    function addPerson(
        string memory _name,
        string memory _password,
        string memory _aadhaar_no,
        string memory _email,
        string memory _location
    ) public onlyOwner {
        require(
            block.timestamp < votingStartTime ||
                block.timestamp > votingEndingTime,
            "Election already started"
        );
        require(
            aadhaarToIndexPerson[_aadhaar_no] == 0,
            "Person already exists"
        );

        people.push(
            Person(_name, _password, _aadhaar_no, _email, _location, 0, "", "")
        );
        aadhaarToIndexPerson[_aadhaar_no] = people.length;
    }

    function editPerson(
        string memory _name,
        string memory _password,
        string memory _aadhaar_no,
        string memory _email,
        string memory _location
    ) public onlyOwner {
        require(
            block.timestamp < votingStartTime ||
                block.timestamp > votingEndingTime,
            "Election already started"
        );
        uint256 index = aadhaarToIndexPerson[_aadhaar_no]-1;
        require(index >= 0, "Person not found.");
        people[index].name = _name;
        people[index].password = _password;
        people[index].email = _email;
        people[index].location = _location;
        if(isCandidate[_aadhaar_no]){
            uint256 index2=aadhaarToIndexCandidate[_aadhaar_no];
            Person storage p2=candidates[index2];
            p2.name = _name;
            p2.password = _password;
            p2.email = _email;
            p2.location = _location;
            
        }
    }

    function deletePerson(string memory _aadhaar_no) public onlyOwner {
        require(
            block.timestamp < votingStartTime ||
                block.timestamp > votingEndingTime,
            "Election already started"
        );
        uint256 index = aadhaarToIndexPerson[_aadhaar_no]-1;
        require(index >= 0, "Person not found.");

        people[index] = people[people.length - 1];
        aadhaarToIndexPerson[people[people.length - 1].aadhaar_no] = index+1;
        people.pop();
        if(isCandidate[_aadhaar_no]){
            uint256 index2 = aadhaarToIndexCandidate[_aadhaar_no]-1;
            require(index2 >= 0, "Candidate not found.");

            candidates[index2] = candidates[candidates.length - 1];
            aadhaarToIndexCandidate[candidates[candidates.length - 1].aadhaar_no] = index2+1;
            candidates.pop();
            delete aadhaarToIndexCandidate[_aadhaar_no];
        }
        delete aadhaarToIndexPerson[_aadhaar_no];
        delete isCandidate[_aadhaar_no]; // Delete candidate status
        delete hasVoted[_aadhaar_no]; // Delete vote status (if applicable)
    }

    function getPersonByAadhaar_noAndPassword(
        string memory _aadhaar_no,
        string memory _password
    ) public view returns (Person memory) {
        require(aadhaarToIndexPerson[_aadhaar_no] != 0, "Aadhaar no does not exist");
        uint256 index = aadhaarToIndexPerson[_aadhaar_no]-1;
        Person memory p = people[index];
        require(
            keccak256(bytes(p.password)) == keccak256(bytes(_password)),
            "Aadhaar and password credentials are not matched"
        );
        return p;
    }

    function vote(string memory _aadhaar_no, uint256 index) public {
        require(block.timestamp >= votingStartTime, "Election not started");
        require(block.timestamp <= votingEndingTime, "Election ended");
        require(!hasVoted[_aadhaar_no], "Already voted");

        require(index < candidates.length, "Candidate not found");

        Person storage p = candidates[index];
        p.voteCount++;
        uint256 ind=aadhaarToIndexPerson[p.aadhaar_no]-1;
        people[ind].voteCount++;
        hasVoted[_aadhaar_no] = true;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    function checkOwner() public view returns (bool) {
        return msg.sender == owner;
    }

    function setVotingTimes(
        uint256 startTime,
        uint256 endTime
    ) public onlyOwner {
        votingStartTime = startTime;
        votingEndingTime = endTime;
    }

    function getAllCandidates(
        string memory _aadhaar_no
    ) public view returns (Person[] memory) {
        if (keccak256(bytes(_aadhaar_no)) == keccak256(bytes("all"))) {
            return candidates;
        } else {
            uint256 personIndex = aadhaarToIndexPerson[_aadhaar_no]-1;
            Person memory person = people[personIndex];

            uint256 count = 0;
            for (uint256 i = 0; i < candidates.length; i++) {
                if (
                    keccak256(bytes(candidates[i].constituency)) ==
                    keccak256(bytes(person.location))
                ) {
                    count++;
                }
            }

            Person[] memory matchingCandidates = new Person[](count);
            uint256 index = 0;
            for (uint256 i = 0; i < candidates.length; i++) {
                if (
                    keccak256(bytes(candidates[i].constituency)) ==
                    keccak256(bytes(person.location))
                ) {
                    matchingCandidates[index] = candidates[i];
                    index++;
                }
            }

            return matchingCandidates;
        }
    }

    function getAllPersons() public view returns (Person[] memory) {
        return people;
    }
    function getEmail(string memory aadhaar_no) public view returns (string memory,string memory) {
        require(aadhaarToIndexPerson[aadhaar_no] != 0, "This Aadhaar user is not registered for voting");
        uint256 index = aadhaarToIndexPerson[aadhaar_no];
        Person memory p = people[index - 1]; 
        return (p.email,p.password);
    }

   
}
