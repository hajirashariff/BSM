/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  reactStrictMode: true,
  // Prevent Next.js from inferring a workspace root outside the repo
  outputFileTracingRoot: path.join(__dirname, '../..')
};

module.exports = nextConfig;

