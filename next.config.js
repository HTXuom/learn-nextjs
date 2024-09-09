/** @type {import('next').NextConfig} */
const nextConfig = {
    images:
    {
        // domains: ['cellphones.com.vn', 'media.istockphoto.com'],
        remotePatterns: [

            {
                protocol: 'https',
                hostname: 'encrypted-tbn0.gstatic.com',
                port: '',
                pathname: '/images/**',
            },
            {
                protocol: 'https',
                hostname: 'cellphones.com.vn',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'media.istockphoto.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'loremflickr.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'www.espamob.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'static.nike.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: '2sao.vietnamnetjsc.vn',
                port: '',
                pathname: '/**',
            },
        ],
    },
    experimental: {
        middleware: true, // Bật tính năng middleware (nếu cần)
    },
};

module.exports = nextConfig;

