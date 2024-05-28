export const STORAGE = {
    ACCESS_TOKEN: 'access_token',
    USER_INFO: 'user_info',
}

export const NAV_BAR_ITEM = [
    {
        label: 'menu.channel',
        path: '',
    },
    {
        label: 'menu.my_inventory',
        path: 'my-inventory',
        children: [
            {
                label: 'menu.collection',
                path: '/collection',
            },
            {
                label: 'menu.reward',
                path: '/reward',
            },
        ],
    },
    {
        label: 'menu.profile',
        path: 'profile',
    },
    {
        label: 'menu.marketplace',
        path: 'marketplace',
    },
]


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