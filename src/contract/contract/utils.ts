import { CasperClient, CLPublicKey, Keys, CasperServiceByJsonRPC, DeployUtil, Signer,   } from "casper-js-sdk";
import { Deploy } from 'casper-js-sdk/dist/lib/DeployUtil';

export const parseTokenMeta = (str: string): Array<[string, string]> =>
  str.split(",").map((s) => {
    const map = s.split(" ");
    return [map[0], map[1]];
  });

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Returns a set ECC key pairs - one for each NCTL user account.
 * @param {String} pathToUsers - Path to NCTL user directories.
 * @return {Array} An array of assymmetric keys.
 */
export const getKeyPairOfUserSet = (pathToUsers: string) => {
  return [1, 2, 3, 4, 5].map((userID) => {
    return Keys.Ed25519.parseKeyFiles(
      `${pathToUsers}/user-${userID}/public_key.pem`,
      `${pathToUsers}/user-${userID}/secret_key.pem`
    );
  });
};

export const getDeploy = async (NODE_URL: string, deployHash: string) => {
  const client = new CasperClient(NODE_URL);
  let i = 300;
  while (i != 0) {
    const [deploy, raw] = await client.getDeploy(deployHash);
    if (raw.execution_results.length !== 0) {
      // @ts-ignore
      if (raw.execution_results[0].result.Success) {
        return deploy;
      } else {
        // @ts-ignore
        throw Error(
          "Contract execution: " +
            // @ts-ignore
            raw.execution_results[0].result.Failure.error_message
        );
      }
    } else {
      i--;
      await sleep(1000);
      continue;
    }
  }
  throw Error("Timeout after " + i + "s. Something's wrong");
};

export const getAccountInfo: any = async (
  nodeAddress: string,
  publicKey: CLPublicKey
) => {
  const client = new CasperServiceByJsonRPC(nodeAddress);
  const stateRootHash = await client.getStateRootHash();
  const accountHash = publicKey.toAccountHashStr();
  const blockState = await client.getBlockState(stateRootHash, accountHash, []);
  return blockState.Account;
};

/**
 * Returns a value under an on-chain account's storage.
 * @param accountInfo - On-chain account's info.
 * @param namedKey - A named key associated with an on-chain account.
 */
export const getAccountNamedKeyValue = (accountInfo: any, namedKey: string) => {
  const found = accountInfo.namedKeys.find((i: any) => i.name === namedKey);
  if (found) {
    return found.key;
  }
  return undefined;
};

/**** New Methods ****/

export function HexToCLPublicKey(publicKey: string) {
  console.log('Parsing public key string: ', publicKey);
  return CLPublicKey.fromHex(publicKey);
}

export function parseNFT(rawData: Map<string, string>, id: string): any {
  const title = rawData.get('title');
  const description = rawData.get('description');
  const url = rawData.get('url');

  rawData.delete('title');
  rawData.delete('description');
  rawData.delete('url');

  return {
    id,
    title: title || 'Untitled',
    description: description || 'Description not available',
    url: url || 'invalid',
  };
}

export function isValidHttpUrl(string: string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
}

export const getNFTImage = async (tokenMetaUri: string) => {
  const baseIPFS = 'https://vinfts.mypinata.cloud/ipfs/';
  if (tokenMetaUri.includes('/')) {
    const mappedUrl = tokenMetaUri.includes('ipfs/')
      ? tokenMetaUri.split('ipfs/').pop()
      : tokenMetaUri;
    return baseIPFS + mappedUrl;
  }
  const resp = await fetch(baseIPFS + tokenMetaUri);
  const imgString = await resp.text();
  return imgString;
};


export const signDeploy = async (deploy: Deploy, publicKey: CLPublicKey) => {
  const publicKeyHex = publicKey.toHex();
  return await signDeployHex(deploy, publicKeyHex);
};

export const signDeployHex = async (deploy: Deploy, publicKeyHex: string) => {
  const deployJSON = DeployUtil.deployToJson(deploy);
  const signedDeployJSON = await Signer.sign(
    deployJSON,
    publicKeyHex,
    publicKeyHex
  ).catch((err) => console.log(err));
  const signedDeploy = DeployUtil.deployFromJson(signedDeployJSON).unwrap();

  return signedDeploy;
};

