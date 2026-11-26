# frontend

DocHub 的前端：Next.js 16（App Router）、React 19、Ant Design 6，包管理用 pnpm。项目整体说明见[仓库根目录的 README](../README.md)，前后端的关系见 [architecture](../docs/architecture.md)。

## 本地运行

Node 版本跟随仓库根目录的 `.nvmrc`；pnpm 的版本已在 `package.json` 的 `packageManager` 里固定。

```bash
nvm use
pnpm install
pnpm dev
```

启动后打开 http://localhost:3000 。

## 和后端的关系

前后端同源，登录 Cookie 不涉及跨域。`pnpm dev` 时，Next.js 把 `/api/*` 和 `/files/*` 转发给后端，其余路径由前端自己处理。

后端地址由环境变量 `BACKEND_ORIGIN` 指定，默认 `http://localhost:8080`。后端换了端口时，启动前设置它，或者在 `.env.local` 里写一行（`.env*` 不进仓库）：

```
BACKEND_ORIGIN=http://localhost:9090
```

转发只在开发环境生效。`pnpm build` 加 `pnpm start` 是生产形态，`/api/` 和 `/files/` 要由 nginx 分流给后端。

## 目录

```
app/
  layout.tsx    根布局：包了 AntdRegistry，页面语言设为 zh-CN
  page.tsx      临时首页，只用来验证 Ant Design 的接入
next.config.ts  开发环境下 /api、/files 的转发规则
```

管理端的页面、请求封装（`lib/api/`）和展示端（`app/(portal)/`）在后面几周陆续加入，计划见 [`openspec/changes/`](../openspec/changes/)。

## 其他命令

- `pnpm lint`：ESLint
- `pnpm build`：生产构建
- `pnpm start`：运行生产构建

## 写页面时注意

- `AntdRegistry` 放在根布局里，包住所有页面；不要去掉。
- App Router 下不能用点分写法的子组件，例如 `<Select.Option />`、`<Typography.Text />`，要从各自的路径引入。
