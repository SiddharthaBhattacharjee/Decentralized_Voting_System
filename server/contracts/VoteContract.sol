//SPDX-License-Identifier: unlicensed
pragma solidity ^0.8.9;

contract VoteContract{
    address owner;
    bool votingEnabled;
    mapping(address=>bool) voted;
    mapping(uint256=>uint256) votes;
    mapping(uint256=>string) candidates;
    mapping(address=>bool) whitelist;
    uint256 candidateCount;
    
    constructor() {
        owner = msg.sender;
        whitelist[owner] = true;
    }

    function toggleVotingEnabled() public {
        require(msg.sender == owner,"Access Denied : only owner can access this function!");
        votingEnabled = !votingEnabled;
    }

    function addCandidate(string memory name) public {
        require(msg.sender == owner,"Access Denied : only owner can access this function!");
        candidateCount++;
        candidates[candidateCount] = name;
        votes[candidateCount] = 0;
    }

    function vote(uint256 index) public {
        require(votingEnabled,"Voting is not enabled!");
        require(bytes(candidates[index]).length>0,"Candidate Not Found");
        require(whitelist[msg.sender], "You are not allowed to vote");
        require(!voted[msg.sender],"You have already voted");
        votes[index]++;
        voted[msg.sender] = true;
    }

    function getResult() view public returns(uint256[] memory){
        uint256[] memory voteresult = new uint[](candidateCount+1);
        for(uint i=1;i<=candidateCount;i++){
            voteresult[i] = votes[i];
        }
        return voteresult;
    }

    function getCandidateData() view public returns(string[] memory){
        string[] memory candidatedata = new string[](candidateCount+1);
        for(uint i=1;i<=candidateCount;i++){
            candidatedata[i] = candidates[i];
        }
        return candidatedata;
    }

    function hasVoted() view public returns(bool){
        return voted[msg.sender];
    }

    function isVotingEnabled() view public returns(bool){
        return votingEnabled;
    }

    function getCandidateCount() view public returns(uint256){
        return candidateCount;
    }

    function addToWhitelist(address _address) public {
        require(msg.sender == owner,"Access Denied : only owner can access this function!");
        whitelist[_address] = true;
    }
    
    function removeFromWhitelist(address _address) public {
        require(msg.sender == owner,"Access Denied : only owner can access this function!");
        whitelist[_address] = false;
    }
    
    function isWhitelisted(address _address) public view returns(bool) {
        return whitelist[_address];
    }

    function isOwner() view public returns(bool){
        return msg.sender == owner;
    }
}