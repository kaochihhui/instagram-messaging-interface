/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    AGENTQL_API_KEY: process.env.AGENTQL_API_KEY,
  },
}

module.exports = nextConfig