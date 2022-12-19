import {oracleABI} from "../../constants/Ethereum/Oracle"
import {TokensEnum} from "./TokensEnum";
import { networkRpcs } from "./TokensEnum";
import { networkChainIds } from "./TokensEnum";
import { ethers } from 'ethers';
import { networkRpcsII } from "./TokensEnum";
// READING TOKEN PRICES FROM MAINNET ("ETH", "MATIC", "BSC").

/**
 * 
 * @param {*} csprAmount 
 * @param {*} networkRpc 
 * @returns equivalent USD amount to CSPR
 */
async function csprToUsd(csprAmount, networkRpc) {
    const provider = new ethers.providers.JsonRpcProvider(networkRpc);
    const oracleAddress = TokensEnum.CSPR_TO_USD;
    const priceFeed = new ethers.Contract(oracleAddress, oracleABI, provider);

    let csprToUsd = await priceFeed.latestRoundData();
    const decimals = await priceFeed.decimals();
    return csprAmount * Number((csprToUsd.answer.toString() / Math.pow(10, decimals)).toFixed(8));
}

/**
 * @devnote enter cspr amount in `tokenAmount` and token name that you want to convert to in `destintationToken`
 * @exmaple convertToken(250, "ETH")
 * @param {*} tokenAmount 
 * @param {*} destinationToken 
 * @returns converted amount of tokens
 */
export async function convertToken(tokenAmount, destinationNetwork, destinationToken) {
    let usdAmount = await csprToUsd(tokenAmount, networkRpcsII["ETHEREUM"]);
    console.log(usdAmount);
    console.log(destinationToken);
    return UsdToToken(
        usdAmount,
        networkRpcsII[destinationNetwork],
        destinationToken,
        destinationNetwork
    )
}

async function UsdToToken(usdAmount, networkRpc, token, destinationNetwork) {
    const provider = new ethers.providers.JsonRpcProvider(networkRpc);
    const oracleAddress = TokensEnum[destinationNetwork]["USD_TO_"+token];
    const priceFeed = new ethers.Contract(oracleAddress, oracleABI, provider);
    let usdToEth = await priceFeed.latestRoundData();
    const decimals = await priceFeed.decimals();
    console.log("usdToToken", usdAmount / Number((usdToEth.answer.toString() / Math.pow(10, decimals)).toFixed(8)));
    return usdAmount / Number((usdToEth.answer.toString() / Math.pow(10, decimals)).toFixed(8));
}
