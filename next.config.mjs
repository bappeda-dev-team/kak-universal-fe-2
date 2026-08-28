/** @type {import('next').NextConfig} */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/api-user/:path*", // panggilan fe
                destination: `${BASE_URL}/user/:path*` // backend
            },
            {
                source: "/api-perencanaan/:path*", // panggilan fe
                destination: `${BASE_URL}/api/v1/perencanaan/:path*` // backend
            },
            {
                source: "/api-auth/:path*", // panggilan fe
                destination: `${BASE_URL}/auth/:path*` // backend
            },
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'logo.kertaskerja.cc',
                pathname: '**'
            }
        ]
    },
    output: "standalone",
};

export default nextConfig;
