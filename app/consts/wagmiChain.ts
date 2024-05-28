import {Chain} from "viem/chains";

export const polygonAmoy: Chain = {
    id: 80_002,
    name: 'Polygon Amoy',
    network: '80002',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc-amoy.polygon.technology/'],
        },
        public: {
            http: ['https://rpc-amoy.polygon.technology/'],
        },
    }
}

export const opal: Chain = {
    id: 8882,
    name: 'Opal',
    network: '8882',
    blockExplorers: {
        default: {
            name: 'subscan',
            url: "https://opal.subscan.io/"
        },
    },
    nativeCurrency: { name: 'OPL', symbol: 'OPL', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://rpc-opal.unique.network'],
        },
        public: {
            http: ['https://rpc-opal.unique.network'],
        },
    }
}