import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // Lets the dev server's hot-reload scripts run when the phone loads the
  // site over the LAN IP instead of localhost — otherwise the client JS
  // never finishes initializing and the page stays blank.
  allowedDevOrigins: ["192.168.100.34"],
};

export default nextConfig;
