
/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '',
    baseUrl: 'connecto.thecosmicblock.com',
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
    rewrites: async () => {
        return [
            {
                source: '/channels',
                destination: '/',
            },
        ];
    },
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    }
};

export default nextConfig;
