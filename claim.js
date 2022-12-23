const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig'); // development only
const {defaultPrivateKey} = require(`./keys.json`);

global.nativeFetch = require('node-fetch')
global.fetch = (url, args = {}) => {
  args.headers = args.headers || {}
  args.headers['user-agent'] = 'LifeWithSascha';
  return nativeFetch(url, args)
}

global.WebSocket = require('ws')
const { TextEncoder, TextDecoder } = require('util');

const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);

const rpc = new JsonRpc('https://wax.cryptolions.io', { fetch });
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

const CLAIM_VOTE_CONTRACT = 'eosio';
const CLAIM_VOTE_ACTION = 'claimgbmvote';

const claimVote = async (actor, permission) => {
  try
  {
    const result = await api.transact({
      actions: [{
        account: CLAIM_VOTE_CONTRACT,
        name: CLAIM_VOTE_ACTION,
        authorization: [{
          actor: actor,
          permission: permission,
        }],
        data: {
          owner: actor
        },
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });
  }
  catch (e)
  {
    if (e instanceof RpcError)
    {
      console.log(JSON.stringify(e.json, null, 2));
    }
    else
    {
      console.log(e);
    }
  }
}

const main = async() => {
  claimVote('saschaahcsas', 'claimgbmvote');
  claimVote('fx', 'claimgbmvote');
  claimVote('fabriceisone', 'claimgbmvote');
}

main();
