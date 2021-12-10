const CronosToken = artifacts.require("CronosToken");

module.exports = function(deployer) {
    deployer.deploy(
        CronosToken,
        "LUMA Coin",
        "LUMA",
        "1000000000000000000000000"
    );
};