# Proposal

## Why

仓库里还没有任何代码。后面九周的功能都依赖同一套骨架：统一的接口响应、错误映射、参数校验、配置方式和测试基线。先把它立起来，后面的每个任务才有地方落，接口形状也不会各写各的。

## What Changes

- 建立单体 Spring Boot 3.5 项目的骨架：依赖、多环境配置、分层约定。
- 统一所有接口的响应结构和错误码，以及参数校验失败、唯一键冲突、未知异常到 HTTP 状态的映射。
- 接入数据库迁移：启动时自动执行，预置语言字典。
- 建立开发用的 MySQL 和 Redis 环境，以及基于 Testcontainers 的集成测试基线。
- 仓库初始化，`backend/` 和 `frontend/` 两个目录就位；在 `frontend/` 里建好 Next.js 工程的脚手架，不含页面。

## Capabilities

### New Capabilities
- `engineering-foundation`: 后端工程骨架的共同约定——统一响应与错误映射、参数校验、多环境配置、数据库迁移、健康检查、语言字典、集成测试基线

### Modified Capabilities

无。

## Impact

- 新增 `backend/` 下的全部代码与配置、`frontend/` 下的前端工程、`deploy/compose.dev.yml`、`.env.example`、`.gitignore`。
- 引入的依赖清单见 `docs/architecture.md` 的技术选型。
- `GET /api/admin/locales` 是第一个真实接口；在 `add-access-control` 落地之前它暂时不需要登录。
- 对应第 1 周，学习重点：依赖管理、分层、迁移、统一约定。见 `docs/learning/week-01.md`。
