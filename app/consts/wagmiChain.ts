import { Chain } from "viem/chains";

export const polygonAmoy: Chain = {
    id: 80_002,
    name: 'Polygon Amoy',
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

export const NATIVE_TOKEN = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'