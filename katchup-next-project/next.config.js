/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    axios: true,
    reactQuery: true,
    recoil: true,
    recoilPersist: true,
  },
};

module.exports = nextConfig;
