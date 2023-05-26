/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  compiler: {
    axios: true,
    reactQuery: true,
    recoil: true,
    recoilPersist: true,
  },
};

module.exports = nextConfig;
