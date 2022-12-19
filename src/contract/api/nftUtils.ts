import { HexToCLPublicKey} from "../contract/utils";
import { cep47 } from "../contract/cep47";

export const getUserNFTs = async (publicKey: string) => { 
    const publicKeyCLValue = HexToCLPublicKey(publicKey);
    const nftsList = await cep47.getNFTsList(publicKeyCLValue);
    return nftsList;
}       

export const getUserEggs = async (publicKey: string) => { 
    const publicKeyCLValue = HexToCLPublicKey(publicKey);
    const nftsList = await cep47.getNFTsList(publicKeyCLValue);
    const nftsImages : any= []
    for (let i = 0; i < nftsList.length; i++) {
        if(nftsList[i].get('type') != "dragon-egg")
            nftsImages.push(nftsList[i]);
    }
    return nftsImages;
}

export const getUserNFTsImages = async (publicKey: string) => { 
    const publicKeyCLValue = HexToCLPublicKey(publicKey);
    const nftsList = await cep47.getNFTsList(publicKeyCLValue);
    const nftsImages : any= []
    for (let i = 0; i < nftsList.length; i++) {
        if(nftsList[i].get('image') != undefined) 
            nftsImages.push(nftsList[i].get('image'));
    }
    return nftsImages;
}

export const getUserTokens = async (publicKey: string) => { 
    const publicKeyCLValue = HexToCLPublicKey(publicKey);
    const tokensList = await cep47.getUserTokens(publicKeyCLValue);
    return tokensList;
}



// run with ts-node src/contract/api/nftUtils.ts