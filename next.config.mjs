/** @type {import('next').NextConfig} */

function generateCSP() {
    // Daftar domain yang diizinkan
    const allowedDomains = [
        process.env.NEXT_PUBLIC_API_URL,
        process.env.NEXT_PUBLIC_API_URL_RENAKSI_OPD,
        process.env.NEXT_PUBLIC_API_URL_PERMASALAHAN,
        process.env.NEXT_PUBLIC_API_URL_CSF,
        process.env.NEXT_PUBLIC_API_URL_TAGGING,
        process.env.NEXT_PUBLIC_API_URL_CASCADING_PEMDA,
        process.env.NEXT_PUBLIC_API_KEPEGAWAIAN,
    ].filter(Boolean);

    const connectSrc = ["'self'", ...allowedDomains].join(' ');

    return `default-src 'self'; connect-src ${connectSrc}; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self';`
}

const nextConfig = {
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
