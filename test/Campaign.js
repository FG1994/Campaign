require('babel-register');
require('babel-polyfill');

const Campaign = artifacts.require('./Campaign');

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
 * Campaign contract
 */
contract('Campaign', (accounts) => {
    let campaign;

    const owner = accounts[0];

    beforeEach(async () => {
        campaign = await Campaign.new(1, owner);  // this deploy campaign
    });

    it('marks caller as the campagin manager', async () => {
        const manager = await campaign.manager();
        expect(manager).to.be.equal(owner);   //assert that account 0 is the manager
    });

    it('allows people to contribute money and marks them as approvers', async () => {
        await campaign.methods.contribute().send({
            value: '200',
            from: accounts[1]
        });
//function that allows us the mapping, we retrieve only a single value. the account 1
        const isContributor = await campaign.methods.approvers(accounts[1]).call
        assert(isContributor); // if it is not true it fails. thats what assert does
    });
    it('requires a minimum contribution', async () => {
        try {
            await campaign.methods.contribute().send({
                //the below should result in a error since 5 is too low
                value: '5',
                from: accounts[1]
            });
            assert(false); //makes sure that the above failes
        }
//as the above "try" statement should result in an error, it should go to catch
        catch (err) {
            assert(err);
        }
    });
    it('allows a manager to create a payment request', async () => {
        await campaign.methods.createRequest()
            .createRequest('Buy batteries', '100', accounts[1])
            .send({
                from: accounts[0],
                gas: '1000000'
            });
        const request = await campaign.methods.requests(0).call();
        assert.equal('Buy batteries', request.description); //check if the description is buy batteries
    });
});
