# Auto claim voter rewards for WAX

## What does it do?

If you have staked WAX for NET or CPU, you can vote for block producers and claim a voter reward every 24 hours.

This project aims to automize this process so you don't miss out on your rewards.


## How to get started?

Create a private key that can only do the `eosio::claimgbmvote` and `eosio::voteproducer` actions. Therefore, the code can vote and claim your rewards but nothing bad can happen to you, if this private key is revealed to anybody else.

! Do IN NO CASE use your usual private key here.

You can delegate claimgbmvote and voteproducer permissions from different accounts to your main account.

If you are ready with your limited private key, put it as `defaultPrivateKey` in `sample.config.json` and rename it to `config.json`

Next to this, change the `claimVote` and `voteProducer` calls to your accounts.

```
npm install
node claim.js
node voteproducer.js
```
