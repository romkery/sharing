const { i18n } = require('./next-i18next.config');
/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  // https://nextjs.org/docs/basic-features/eslint#linting-custom-directories-and-files
  eslint: {
    dirs: ['config', 'cypress', 'src'],
  },
  reactStrictMode: true,
  trailingSlash: true,
  i18n,
};

module.exports = nextConfig;
