// import { networkRpcs } from "./TokensEnum";
import { networkChainIds, nativeTokens, contractAddress, ERC20Addresses } from "./TokensEnum";
import { ethers } from 'ethers';
// import { oracleABI } from "../../constants/Ethereum/Oracle";
// import { contractAddress } from "./TokensEnum";
import DonationsContractData from '../../constants/Ethereum/Donations.json';
import IERC20ABI from '../../constants/Ethereum/IERC20.json';
import { amountToApprove } from '../../api/erc20-approvals/checkApprovedAmount';
import { approveAmount } from '../../api/erc20-approvals/approveAmount';

// import {  } from "./TokensEnum";
// connect to user's metamask wallet

async function connectToMetamask () {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    //console.log(accounts[0]);
    return [accounts[0], provider, signer];
};


// ex: await payWithToken(0.1, "ETH", "wallet", "wallet", 8);
export async function PayWithToken(tokenAmount, destinationNetwork, tokenName, beneficiaryWallet, artistWallet, artistPercentage) {
    console.log(networkChainIds[destinationNetwork]);
    const chainId = networkChainIds[destinationNetwork][process.env.REACT_APP_IS_PRODUCTION]; // supposed network chain id
    // const rpc = networkRpcs.tokenName[process.env.REACT_APP_IS_PRODUCTION]; // supposed network rpc.
    const user_data = await connectToMetamask();
    const user_chain_data = await user_data[1].getNetwork();
    console.log(user_chain_data);
    if(user_chain_data.chainId != chainId) {
        alert(`incorrect network, please connect to chain id ${chainId} and you're on ${user_chain_data.chainId}`);
        return false;
    }

    const donationContract = new ethers.Contract(
        contractAddress[destinationNetwork][process.env.REACT_APP_IS_PRODUCTION],  // how to get correct contract address ?!
        DonationsContractData.abi, // same for all contracts
        user_data[2] // user provider
    );
    
    debugger;
    if(nativeTokens.includes(tokenName)) {
      return await payWithNativeTokens(beneficiaryWallet, artistWallet, artistPercentage, tokenAmount, donationContract);
    }else{
      debugger;
      return await payWithERC20Tokens(destinationNetwork, user_data[0], user_data[2], ERC20Addresses[destinationNetwork][tokenName][process.env.REACT_APP_IS_PRODUCTION], tokenAmount, beneficiaryWallet, artistWallet, artistPercentage, donationContract);
    }
  }

async function payWithERC20Tokens(destinationNetwork, user_address, user_prov, tokenAddress, tokenAmount, beneficiaryWallet, artistWallet, artistPercentage, donationsContract) {
  try{
    const ierc20_contract = new ethers.Contract(
      tokenAddress,
      IERC20ABI,
      user_prov
    )
    const decimals = await ierc20_contract.decimals();
    let amount = ethers.utils.parseUnits(tokenAmount.toString(), decimals);
    debugger;
    const amntToApprv = await amountToApprove(user_address, user_prov, destinationNetwork, tokenAddress, amount);
    if(amntToApprv > 0) {
      await approveAmount(destinationNetwork, user_prov, tokenAddress, amount);
    }
    debugger;
    console.log(amount);
    let transactionAmount = amount.toString();
    debugger;
    const res = await donationsContract.puchraseTokenWithERC20(tokenAddress, amount.toString(), beneficiaryWallet, artistWallet, artistPercentage);
    debugger;
    const result = await res.wait();
    if(result != undefined) {return true;}
    else{return false;}
    // .then((res) => {
    //   res.wait().then(async(result) => {
    //     console.log("success");
    //     return true;
    //   })
    // }).catch(e => {
    //   console.log("transaction failed " + e.message);
    //   return false;
    // });
  }catch(e) {
    console.log("transaction failed " + e.message);
    return false;
  }
}

async function payWithNativeTokens(beneficiaryWallet, artistWallet, artistPercentage, tokenAmount, donationsContract) {
  try{
    debugger;
    const res = await donationsContract.purchaseToken(beneficiaryWallet, artistWallet, artistPercentage, {value: ethers.utils.parseEther(tokenAmount.toString())})
    const result = await res.wait();
    if(result!=undefined) {return true;}
    else{return false;}
    // .then((res) => {
    //   res.wait().then(async(result) => {
    //     console.log("success");
    //     return 1;
    //   })
    // }).catch(e => {
    //   console.log("transaction failed " + e.message);
    //   return false;
    // });
  }catch(e) {
    console.log("transaction failed")
    return false;
  }
}