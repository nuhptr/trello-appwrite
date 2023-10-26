/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: false,
   images: {
      remotePatterns: [
         { protocol: "https", hostname: "cloud.appwrite.io", port: "" },
         { protocol: "https", hostname: "links.papareact.com", port: "" },
      ],
   },
}

module.exports = nextConfig
