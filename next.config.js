/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.lorem.space'],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  }
};

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  include: ['production'],
  register: true,
});

module.exports = withPWA(nextConfig);