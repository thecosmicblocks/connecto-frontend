export const STORAGE = {
    ACCESS_TOKEN: 'access_token',
    USER_INFO: 'user_info',
}

export const TASK_TYPE = {
    SUBSCRIBE_WEB3_CHANNEL: 'SUBSCRIBE_WEB3_CHANNEL',
    JOIN_DISCORD: 'JOIN_DISCORD',
}

export const SEO_CONTENT = {
    title: 'Connecto',
    description: 'Connecto is a quest system for streamers, designed, KOL to build and engage with their fanbase by leveraging cNFT technology.',
    image: process.env.NEXT_PUBLIC_URL + '/favicon.ico',
    siteName: 'Connecto',
    twitter: '@Connecto',
    siteUrl: 'connecto.thecosmicblock.com',
}

export const PAGE_SIZE = 10

export const CONTRACT_ADDRESS: Record<"DEVELOPMENT" | "STAGING" | "PRODUCTION", Record<string, `0x${string}`>> = {
    "DEVELOPMENT": {
        "UNIQUE_CONNECTO_TOKEN": "0xa51AAF36BF609c5190539661f111dBE71E6Bb64f",
        "UNIQUE_CONNECTO_NFT_MANAGER": "0x01510CBabD26F8f4CB3326fA0f1579A302D25904",
        "UNIQUE_CONNECTO_NFT_MANAGER_IMPL": "0x6e8Aa4d338269f4c1FE60953b573a07A29d40ec6",
        "UNIQUE_CONNECTO_MARKETPLACE": "0x68C356C18f2B88F26dbEfB5E55491D7CA964EB86",
        "UNIQUE_CONNECTO_MARKETPLACE_IMPL": "0x59c4e4d530705DFf05C438ae6ee044631A324a9f",
        "UNIQUE_CONNECTO_PROTOCOL": "0xc7383EB2ebAa37953090BFde1f64e834fa6De0B5",
        "UNIQUE_CONNECTO_PROTOCOL_IMPL": "0x5eB22d3d4BeB7212E820e1E81615fbd2276ae531"
    },
    "STAGING": {},
    "PRODUCTION": {}
}

export const ListingType = {
    Direct: 0,
    Auction: 1,
} as const
