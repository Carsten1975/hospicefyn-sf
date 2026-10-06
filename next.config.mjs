/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep the same URLs as the old WordPress site (/indmeldelse/ etc.)
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
