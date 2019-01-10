/**
 * Migration script
 */
const Campaign = artifacts.require('./Campaign.sol');
const CampaignFactory = artifacts.require('./CampaignFactory.sol');

module.exports = async function (deployer, network, accounts) { // eslint-disable-line
    const owner = accounts[0];

    await deployer.deploy(Campaign);
    await deployer.deploy(CampaignFactory);
};
