/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdnkk.zeabur.app',
                pathname: '**'
            }
        ]
    },
    output: "standalone",
};

export default nextConfig;
