import { ethers } from 'ethers';
import IERC20ABI from '../../constants/Ethereum/IERC20.json';
import {contractAddress} from '../../api/payment/TokensEnum';

export async function amountToApprove(user_address, user_provider, destinationNetwork, destinationTokenAddress , tokenAmount) {
    const IERC20_CONTRACT = new ethers.Contract(
        destinationTokenAddress,
        IERC20ABI,
        user_provider
    )
    let allowedAmount = await IERC20_CONTRACT.allowance(user_address, contractAddress[destinationNetwork][process.env.REACT_APP_IS_PRODUCTION]);
    console.log(allowedAmount.toString());
    console.log(tokenAmount);
    // console.log(allowedAmount.lt(ethers.BigNumber.from(tokenAmount)));
    if(allowedAmount.lt(tokenAmount)) {
        return tokenAmount.toString();
    }else{
        return 0;
    }
}