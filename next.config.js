const { i18n } = require('./next-i18next.config');
/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  // https://nextjs.org/docs/basic-features/eslint#linting-custom-directories-and-files
  eslint: {
    dirs: ['config', 'cypress', 'src'],
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  trailingSlash: true,
  i18n,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
