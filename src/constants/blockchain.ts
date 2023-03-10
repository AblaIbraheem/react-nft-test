export const proxyServer = process.env.REACT_APP_PROXY_SERVER || '';
export const NFT_STORAGE_KEY = process.env.REACT_APP_NFT_STORAGE_KEY;
export const NODE_RPC_ADDRESS =
  process.env.REACT_APP_NODE_RPC_ADDRESS ||
  'https://node-clarity-testnet.make.services/rpc';

export const USER_KEY_PAIR_PATH =
  process.env.REACT_APP_USER_KEY_PAIR_PATH ||
  'D:/Ibrahim/github-projects/New folder/casperNFT_marketplace/deploy-scripts/keys/';

export const DEPLOYER_ACC =
  process.env.REACT_APP_CASPER_PUBLIC_KEY ||
  '01fb6e663984ffaca91dbf3725e8d688659c66d5bf45d0cb2705cba04908d3b6b9';

export const CONNECTION = {
  NODE_ADDRESS: proxyServer + NODE_RPC_ADDRESS,
  CHAIN_NAME: process.env.REACT_APP_CHAIN_NAME || 'casper-test',

  CONTRACT_NAME: process.env.REACT_APP_CONTRACT_NAME || 'VINFTv0_0_1',

  CONTRACT_HASH: 
    'hash-5c323b2827258e644cb2e87af5c895fdb129470511be41c08d8f48bba4ea5f08',
  CONTRACT_PACKAGE_HASH:
    'hash-45739422ac9baf6367e70e12da40caf55b04719b5cf60dbab7bf810d910400f5',
};

export const KEYS = {
  DEPLOYER_ACC_HASH:
    process.env.REACT_APP_DEPLOYER_ACC_HASH ||
    'account-hash-14b94d33a1be1a2741ddefa7ae68a28cd1956e3801730bea617bf529d50f8aea',
  DEPLOYER_ACC:
    process.env.REACT_APP_DEPLOYER_ACC_HASH ||
    '01e23d200eb0f3c8a3dacc8453644e6fcf4462585a68234ebb1c3d6cc8971148c2',
};

export const NFT_CONTRACT_HASH = process.env.REACT_APP_CASPER_NFT_CONTRACT_HASH;
export const NFT_PACKAGE_HASH =
  process.env.REACT_APP_CASPER_NFT_CONTRACT_PACKAGE_HASH;

export const PROFILE_CONTRACT_HASH =
  process.env.REACT_APP_CASPER_PROFILE_CONTRACT_HASH;
export const PROFILE_PACKAGE_HASH =
  process.env.REACT_APP_CASPER_PROFILE_CONTRACT_PACKAGE_HASH;
