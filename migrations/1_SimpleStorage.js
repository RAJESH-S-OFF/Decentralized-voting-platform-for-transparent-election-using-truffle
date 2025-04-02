



const SimpleStorage = artifacts.require("SimpleStorage");

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage)
    .then(() => console.log("Deployment successful"))
    .catch(error => console.error("Deployment failed:", error));
};
