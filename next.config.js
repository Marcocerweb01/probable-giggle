const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // appDir: true,
    missingSuspenseWithCSRBailout: false,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    config.resolve.alias['@components'] = path.resolve(__dirname, 'components');
    return config;
  },
};

module.exports = nextConfig;

