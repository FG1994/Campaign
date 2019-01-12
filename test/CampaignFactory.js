require('babel-register');
require('babel-polyfill');

const CampaignFactory = artifacts.require('./CampaignFactory');

const BN = web3.utils.BN;
require('chai')
    .use(require('chai-as-promised'))
    .use(require('bn-chai')(BN))
    .use(require('dirty-chai'))
    .use(require('chai-string'))
    .should();
const chai = require('chai');
const expect = chai.expect;

/**
 * CampaignFactory contract
 */
contract('CampaignFactory', () => {
    let campaignFactory;

    beforeEach(async () => {
        campaignFactory = await CampaignFactory.new();
    });

    it('should check proper construction', async () => {

    });
});
