const bizSdk = require('facebook-nodejs-business-sdk');

const accessToken = '{access-token}';
const accountId = 'act_{{adaccount-id}}';

const FacebookAdsApi = bizSdk.FacebookAdsApi.init(accessToken);
const AdAccount = bizSdk.AdAccount;
const Campaign = bizSdk.Campaign;

const account = new AdAccount(accountId);
var campaigns;

account.read([AdAccount.Fields.name])
    .then((account) =>{
        return account.getCampaigns([Campaign.Fields.name], { limit: 10 }) // fields array and params
    })
    .then((result) =>{
        campaigns = result
        campaigns.forEach((campaign) =>console.log(campaign.name))
    }).catch(console.error);
