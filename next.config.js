// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  output: "export",
  distDir: "build",
  experimental: {
    appDir: true,
  },
  reactStrictMode: false,
};

module.exports = nextConfig
