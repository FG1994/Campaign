pragma solidity ^0.5.0;

import "./Campaign.sol";

contract CampaignFactory {
    Campaign[] public deployedCampaigns;

    //minimum contribution our new contract expects BELOW:
    function createCampaign(uint minimum) public  {
        // instruct the function that a new campaign contract is issued
        Campaign newCampaign = new Campaign(minimum, msg.sender);
        //refers to Campaign function
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (Campaign[] memory) {
        return deployedCampaigns;
    }
}
