import type { NextConfig } from "next";
const path = require('path');

/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');

    const sassRule = config.module.rules.find(
      (rule: any) => rule.test && rule.test.toString().includes('scss')
    );
    if (sassRule) {
      sassRule.use.forEach((u: any) => {
        if (u.loader && u.loader.includes('sass-loader')) {
          u.options = {
            ...u.options,
            sassOptions: {
              includePaths: [path.join(__dirname, 'src')],
            },
          };
        }
      });
    }

    return config;
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
	experimental: {
		optimizePackageImports: ['axios', 'lucide-react'],
	}
};

module.exports = withPWA(nextConfig);
