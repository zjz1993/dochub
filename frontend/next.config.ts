import type { NextConfig } from "next";

// 后端的地址。生产环境不在这里转发（/api/ 和 /files/ 由 nginx 直接转给后端），
// 所以只有开发环境会用到它
const backendOrigin = process.env.BACKEND_ORIGIN ?? "http://localhost:8080";

const nextConfig: NextConfig = {
  // 开发环境由 Next.js 把接口和文件的请求转给后端，前后端因此同源，登录 Cookie 不跨域。
  // 生产环境由 nginx 按路径分流，不走这里。
  ...(process.env.NODE_ENV === "development" && {
    async rewrites() {
      return [
        { source: "/api/:path*", destination: `${backendOrigin}/api/:path*` },
        { source: "/files/:path*", destination: `${backendOrigin}/files/:path*` },
      ];
    },
  }),
};

export default nextConfig;
