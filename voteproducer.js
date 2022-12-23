const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig'); // development only
global.nativeFetch = require('node-fetch')
global.fetch = (url, args = {}) => {
  args.headers = args.headers || {}
  args.headers['user-agent'] = 'LifeWithSascha';
  return nativeFetch(url, args)
}

global.WebSocket = require('ws')
const { TextEncoder, TextDecoder } = require('util');

const defaultPrivateKey = '5JJHCc46kAMwNAEp3vU11rkBiHUAFzRgkbNBqfWajqkg1g5QL2F';
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);

const rpc = new JsonRpc('https://wax.cryptolions.io', { fetch });
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

const SET_VOTE_PRODUCER_CONTRACT = 'eosio';
const SET_VOTE_PRODUCER_ACTION = 'voteproducer';

const setVoteProducer = async (actor, permission, proxy) => {
  try
  {
    const result = await api.transact({
      actions: [{
        account: SET_VOTE_PRODUCER_CONTRACT,
        name: SET_VOTE_PRODUCER_ACTION,
        authorization: [{
          actor: actor,
          permission: permission,
        }],
        data: {
          voter: actor,
          proxy: proxy,
          producers: [],
        },
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });
    // console.dir(result);
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
  setVoteProducer('saschaahcsas', 'voteproducer', 'waxcommunity');
  setVoteProducer('fx', 'voteproducer', 'waxcommunity');
  setVoteProducer('fabriceisone', 'voteproducer', 'waxcommunity');
}

main();
