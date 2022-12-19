import { ethers } from 'ethers';
import IERC20ABI from '../../constants/Ethereum/IERC20.json';
import {contractAddress} from '../../api/payment/TokensEnum';

export async function approveAmount(destinationNetwork, user_provider, tokenAddress, tokenAmount) {
    const spender = contractAddress[destinationNetwork][process.env.REACT_APP_IS_PRODUCTION];
    const ierc20_contract = new ethers.Contract(
        tokenAddress,
        IERC20ABI,
        user_provider
    )

    try{
        debugger;
        const res = await ierc20_contract.approve(
            spender,
            tokenAmount
        )
        const result = await res.wait();
        if(result != undefined) {return true;}
        else{return false;}
        // .then((res) => {
        //     res.wait().then(async(result) => {
        //       console.log("success");
        //       return true;
        //     })
        //   }).catch(e => {
        //     console.log("transaction failed " + e.message);
        //     return false;
        //   });
    }catch(e) {
        console.log("catch !!");
        return false;
    }
  }