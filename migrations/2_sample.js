 var MyContract = artifacts.require("./Simple.sol");
 var TacToken = artifacts.require("./TAC.sol");
module.exports = function(deployer) {
   deployer.deploy(MyContract);
   deployer.deploy(TacToken);
};
