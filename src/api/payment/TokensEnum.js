export const TokensEnum = {
    CSPR_TO_USD: "0x9e37a8Ee3bFa8eD6783Db031Dc458d200b226074",
    "ETHEREUM":{
        "USD_TO_ETH": "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    },
    "POLYGON":{
        "USD_TO_MATIC": "0xAB594600376Ec9fD91F8e885dADF0CE036862dE0",
        "USD_TO_LINK": "0xd9FFdb71EbE7496cC440152d43986Aae0AB76665"
    },
    "BINANCE":{
        "USD_TO_BSC": "0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE",
    },
}

// export const networkProvider = {
//     ETH_MAINNET: "https://ethereum.publicnode.com",
//     ETH_GORELI: "https://eth-goerli.public.blastapi.io",
//     MATIC_MAINNET: "https://matic-mainnet.chainstacklabs.com",
//     MATIC_TESTNET: "https://matic-testnet-archive-rpc.bwarelabs.com",
//     BSC_MAINNET: "https://bscrpc.com",
//     BSC_TESTNET: "https://bsc-testnet.public.blastapi.io"
// }

export const networkRpcsII = { 
    "ETHEREUM": "https://ethereum.publicnode.com",
    "POLYGON": "https://matic-mainnet.chainstacklabs.com",
    "BINANCE": "https://bscrpc.com"
}


export const networkRpcs = { // [testnet rpc, mainnet rpc] https://ethereum.publicnode.com
    ETH: ["https://eth-goerli.public.blastapi.io", "https://ethereum.publicnode.com"],
    MATIC: ["https://matic-testnet-archive-rpc.bwarelabs.com", "https://matic-mainnet.chainstacklabs.com"],
    BSC: ["https://bsc-testnet.public.blastapi.io", "https://bscrpc.com"]
}

export const networkChainIds = { // [testnet rpc, mainnet rpc]
    "ETHEREUM": [5, 1],
    "POLYGON": [80001, 137],
    "BINANCE": [97, 56]
}

export const contractAddress = { // [testnet address, mainnet address]
    "ETHEREUM":["0x421726de11bcB8a2B4b5880996B437e22204bB55", ""],
    "POLYGON": ["0x4DE77aFEEC6416C4a6C26f747a2Ac95090A8665A", ""],
    "BINANCE": ["0x7745ea4e9a3d5F3e70441139580958962b114318", ""]
}

export const tokenNames = {
    ETH:"ETH",
    MATIC:"MATIC",
    BSC:"BSC",
    LINK:"LINK"
}

export const networkNames = {
    ETHEREUM: "ETHEREUM",
    POLYGON: "POLYGON",
    BINANCE: "BINANCE"
}

export const nativeTokens = ["ETH", "MATIC", "BSC"]

export const ERC20Addresses = { //[testnet, mainnet]
    "ETHEREUM":{

    },
    "POLYGON":{
        "LINK": ["0x326C977E6efc84E512bB9C30f76E30c160eD06FB", "0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39"]
    },
    "BINANCE":{

    }
}

// export const networkChainId = {
//     ETH_MAINNET: 1,
//     ETH_GORELI: 5,
//     MATIC_MAINNET: 137,
//     MATIC_TESTNET: 80001,
//     BSC_MAINNET: 56,
//     BSC_TESTNET: 97
// }