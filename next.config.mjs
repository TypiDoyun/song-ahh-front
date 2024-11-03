/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: `${process.env.NEXT_PUBLIC_IP_ONLY}`,
                port: '3000',
                pathname: '/cover/**',
            },
        ],
    },
};

export default nextConfig;
