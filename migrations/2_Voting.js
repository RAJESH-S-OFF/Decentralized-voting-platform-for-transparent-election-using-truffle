const Voting = artifacts.require("Voting");

module.exports = function (deployer) {
 
  const candidateNames = ["VIJAY", "SEEMAN", "STALIN", "NAVEEN", "KAVIN", "ARULMOZHI", "KANNADASAN", "MEENAKSHI", "VELUCHAMY"];
  const candidateParty = ["TVK", "NTK", "DMK", "TVK", "NTK", "DMK", "TVK", "NTK", "DMK"];
  const candidateLocation = ["CHENNAI", "CHENNAI", "CHENNAI", "TUTICORIN", "TUTICORIN", "MADURAI", "MADURAI", "MADURAI", "TUTICORIN"];

  const durationInMinutes = 60; // Duration for voting
  deployer.deploy(Voting, candidateNames, candidateLocation, candidateParty, durationInMinutes);
};
