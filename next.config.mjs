/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'codeit-bucket.s3.ap-northeast-2.amazonaws.com',
        port: '',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
