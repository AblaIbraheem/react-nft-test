import { config } from "dotenv";
config({ path: ".env.cep47" });
import {
  Keys,CLPublicKey
} from "casper-js-sdk";
import { cep47 } from "../contract/cep47";
import { getDeploy , signDeploy} from "../contract/utils";

import { numberOfNFTsOfPubCLvalue } from './userInfo';


const {
  NODE_ADDRESS,
  MASTER_KEY_PAIR_PATH,
  MINT_ONE_PAYMENT_AMOUNT,
  TRANSFER_ONE_PAYMENT_AMOUNT,
} = process.env;

const KEYS = Keys.Ed25519.parseKeyFiles(
  `${MASTER_KEY_PAIR_PATH}/public_key.pem`,
  `${MASTER_KEY_PAIR_PATH}/secret_key.pem`
);

export const mintFromAddress = async (creatorAddress: string,
  mintOptions: any) => {

  let totalSupply = await cep47.totalSupply();
  let newId = parseInt(totalSupply as string) + 1;

  const publicKeyCLValue = CLPublicKey.fromHex(creatorAddress);
  const oldBalance = await numberOfNFTsOfPubCLvalue(publicKeyCLValue);
  console.log('...... No. of NFTs in your account before mint: ', oldBalance);

  console.log('Final nft info:', {
    publicKeyCLValue,
    mintOptions,
    payments: MINT_ONE_PAYMENT_AMOUNT,
  });

  const mintDeploy: any = await cep47.mint(
    publicKeyCLValue,
    [`${newId}`],
    mintOptions,
    MINT_ONE_PAYMENT_AMOUNT!,
    publicKeyCLValue
  );
  console.log('Mint deploy:', mintDeploy);

  const signedMintDeploy = await signDeploy(mintDeploy , publicKeyCLValue);
  console.log('Signed Mint deploy:', signedMintDeploy);

  const mintDeployHash = await signedMintDeploy.send(NODE_ADDRESS!);
  console.log('Deploy hash', mintDeployHash);
  return mintDeployHash;

};

export const mint = async (mintOptions: any) => { 
  
  let totalSupply = await cep47.totalSupply();
  let newId = parseInt(totalSupply as string) + 1;

  const mintDeploy = await cep47.mint(
    KEYS.publicKey,
    [`${newId}`],
    mintOptions,
    MINT_ONE_PAYMENT_AMOUNT!,
    KEYS.publicKey,
    [KEYS]
  );

  const mintDeployHash = await mintDeploy.send(NODE_ADDRESS!);

  console.log("...... Mint deploy hash: ", mintDeployHash);

  await getDeploy(NODE_ADDRESS!, mintDeployHash);
  console.log("...... Token minted successfully");

  return newId;

}

export const mintToAddress = async (address: string, metas: any) => { 
  const tokenId = await mint(metas);
  const transferOneRecipient = CLPublicKey.fromHex(address);
  const transferOneDeploy = await cep47.transfer(transferOneRecipient, [`${tokenId}`], TRANSFER_ONE_PAYMENT_AMOUNT!, KEYS.publicKey, [KEYS]);
  console.log(`...... Transfer from ${KEYS.publicKey.toAccountHashStr()} to ${transferOneRecipient.toAccountHashStr()}`);
  const transferOneHash = await transferOneDeploy.send(NODE_ADDRESS!);
  await getDeploy(NODE_ADDRESS!, transferOneHash);
  console.log("...... Token transfered successfully");
}

// my public key : 01eac9c388fd7e920cae2a0c5042dcde3a11f11d618a5dcd7b85ca65a6fdc64004


const address = "0117db225b72cc7fd1d8ce8bf7c62670919e4e45cd7cdfc2a31868d897e33c6020"
const myAddress = "01eac9c388fd7e920cae2a0c5042dcde3a11f11d618a5dcd7b85ca65a6fdc64004"
export const metadata = [new Map];
metadata[0].set('name', "Dragon Egg Test");
metadata[0].set('type', "dragon-egg");
metadata[0].set('description', 
  "Sarcophagus: Blue, Skin: Magenta, Magic Spot: Gray, Glow Effects: Purple, Royalty Gods: Sekhmet, Guardian City: A k h e t a t e n"
);
metadata[0].set('image', 'https://scarlet-adequate-clownfish-387.mypinata.cloud/ipfs/QmUzzfKdhyD9j8p541tXuu1opnL7uf4kprU4x1hDA2nUYN');
metadata[0].set('hatched', 'false');


console.log(metadata);

// mintToAddress(myAddress, metadata);

// run: ts-node contract/api/mint.ts