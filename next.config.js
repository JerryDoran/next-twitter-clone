/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'help.twitter.com',
      'avatarfiles.alphacoders.com',
      'images.unsplash.com',
    ],
  },
};

module.exports = nextConfig;
