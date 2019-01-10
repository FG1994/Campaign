const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAdress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts(); //show accounts
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface)) // creates the idea of the contract but diesnt deploy
.deploy({data: compiledFactory.bytecode})   // command the deploymwnt contract:
.send({from: accounts[0], gas:'1000000'}); // send the contract


// this refers to campaign function in the contract file -> create a new campaign
  await factory.methods.createCampaign('100').send({
    from: accounts[0],
    gas: '1000000'
  });

// to interact with new campaign, we need the address of the created contract
await factory.methods.getDeployedCampaigns().call(); //returns array of raddresses
[campaignAddress] = await factory.methods.getDeployedCampaigns().call()
campaign = await new web3.eth.Contract(
JSON.parse(compiledCampaign.interface),
campaignAddress //since the campaign is already compiled and deployed we do not have to deploy again
);

describe('Campaigns', () => {
  it('deploys a factory and a campaign', () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });
it('marks caller as the campagin manager', async () => {
  const manager = await campaign.methods.manager().call();
  assert.equal(accounts[0],manager);   //assert that accont 0 is the manager
});

it('allows people to contribute money and marks them as approvers', async() => {
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
it('allows a manager to create a payment request', async() => {
  await campaign.methods.createRequest()
  .createRequest('Buy batteries', '100', accounts[1] )
  .send({
    from: accounts[0],
    gas: '1000000'
  });
const request = await campaign.methods.requests(0).call();
  assert.equal('Buy batteries', request.description); //check if the description is buy batteries
 });
});
