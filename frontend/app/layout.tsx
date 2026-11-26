import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export const metadata: Metadata = {
  title: "DocHub",
  description: "企业级产品文档管理与发布平台",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN">
      <body>
        {/* 把 Ant Design 的首屏样式注入服务端渲染的 HTML，避免页面闪动 */}
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
