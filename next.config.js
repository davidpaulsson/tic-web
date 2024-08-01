const withMDX = require('@next/mdx')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    reactCompiler: true,
  },
  images: {
    domains: ['images.ctfassets.net'],
  },
};

module.exports = withMDX(nextConfig);
