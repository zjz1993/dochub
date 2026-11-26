# DocHub

企业级产品文档管理与发布平台。软件公司用它管理多条产品线、多个产品版本、多种语言的文档，并把已上线版本的已发布内容展示给读者。

技术栈：Spring Boot 3.5（Java 21、MySQL、Redis、MyBatis-Plus）、Next.js 16、Docker。它也是一个系统学习后端开发的项目，开发方式见 [docs/development-guide.md](./docs/development-guide.md)。

## 目录

```
docHub/
├── AGENTS.md              Agent 的工作规则
├── README.md
├── .agents/skills/        OpenSpec 的六个工作流技能（.zcode/skills/ 里是链接）
├── docs/
│   ├── overview.md            目标、角色、流程、范围
│   ├── domain-model.md        术语表、实体、业务规则
│   ├── architecture.md        架构、分层、技术选型
│   ├── development-guide.md   工作流程、分工、环境、风险
│   ├── api-conventions.md     接口约定与清单
│   ├── database-conventions.md 表设计约定与结构
│   ├── decisions/             架构决策记录
│   └── learning/              每周的学习目标、安排与复盘
├── openspec/
│   ├── config.yaml
│   ├── specs/                 已经实现的能力
│   └── changes/               进行中的变更；archive/ 存放已归档的
├── deploy/                    compose 文件、nginx 配置、备份脚本
├── backend/                   Spring Boot
└── frontend/                  Next.js
```

## 从哪里开始

- 了解这个项目：[docs/overview.md](./docs/overview.md)
- 了解怎么开发：[docs/development-guide.md](./docs/development-guide.md)
- 看进度和每周安排：[docs/learning/README.md](./docs/learning/README.md)、[openspec/changes/](./openspec/changes/)
- 看关键决定：[docs/decisions/](./docs/decisions/)

## 本地运行

前端工程已经建好，后端还没有开始（骨架的计划见 [`openspec/changes/add-engineering-foundation`](./openspec/changes/add-engineering-foundation/)）。启动前端：

```bash
nvm use
cd frontend && pnpm install && pnpm dev
```

打开 http://localhost:3000 。前端在开发环境会把 `/api` 和 `/files` 转发给后端，后端地址默认 `http://localhost:8080`，可以用环境变量 `BACKEND_ORIGIN` 改，详见 [`frontend/README.md`](./frontend/README.md)。

## 用 OpenSpec 管理变更

每个功能都是一个变更，放在 `openspec/changes/<名称>/`，包含 proposal、specs、design、tasks 四样东西。先写清楚，再实现，完成后归档。

OpenSpec CLI 已全局安装（2.1.1），它需要 Node 22.20 以上。仓库根目录的 `.nvmrc` 指定了 24，进入项目后先切换：

```bash
nvm use
openspec list --changes
openspec validate --all --strict
```

Agent 侧的六个工作流技能在 `.agents/skills/`。直接说要做的事即可，例如“应用 add-engineering-foundation 变更”“归档这个变更”。常用命令见 [docs/development-guide.md](./docs/development-guide.md#openspec-技能与命令行)。
