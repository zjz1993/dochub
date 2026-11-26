# Design

## Context

动机见 proposal.md。稳定的技术选型和分层职责在 `docs/architecture.md`，这里只写本变更特有的决定。

## Goals / Non-Goals

**Goals:**
- 项目能一条命令启动，并连上本地的 MySQL 和 Redis。
- 后面所有接口复用同一套响应与异常处理。
- 集成测试一条命令可跑，不依赖开发者本机安装的数据库。

**Non-Goals:**
- 登录与鉴权（下一个变更）。
- 前端的功能页面（第 3 周起建立）；本变更只初始化前端工程。
- 生产环境的镜像和编排（第 10 周）。

## Decisions

1. **先生成只含 web、actuator、validation 的最小项目，其余依赖手工逐个加入。** 这是学习任务，逐个加才能弄清每个依赖的用途。一次性生成全部依赖更省时间，但学不到东西。
2. **业务码放在响应体的 `code` 里，HTTP 状态码表达错误类别。** 前端先按 HTTP 状态分支，再按业务码细化，两者职责不重叠。替代方案是 HTTP 一律 200、只看业务码，会让监控和浏览器工具失去判断依据。
3. **未知异常统一转成 500，响应里不带堆栈。** 堆栈只进日志。
4. **集成测试用 Testcontainers 启动真实的 MySQL 和 Redis。** 迁移脚本和 SQL 是 MySQL 方言，H2 会掩盖差异；Redis 的 Lua 脚本也无法在内存实现里验证。Testcontainers 的版本交给 Spring Boot 管理（1.21.x），不自行升到 2.x。
5. **第一个迁移只建语言字典。** 表小、带预置数据，正好用来理解“迁移只前进”和校验和。
6. **MyBatis-Plus 的自动填充和分页插件在骨架里一次配好。** 后面的实体不用再关心 `created_at`、`updated_at`。
7. **包名暂用 `dev.dochub`**，作者可以在第一个任务里整体替换。
8. **前端工程提前到任务 1.3 初始化，只含脚手架。** 原计划第 3 周随管理端页面一起建；作者在开工前要求先建好。脚手架只有三样：create-next-app 的结果、Ant Design 与 `AntdRegistry` 的接入、开发环境对 `/api` 和 `/files` 的转发。转发只在开发环境生效，生产环境仍由 nginx 分流，见 `docs/architecture.md`。登录、布局、请求封装和页面留在第 3 周的任务 3.1（`add-product-management`）。

## Risks / Trade-offs

- [Testcontainers 依赖本机 Docker，首次拉镜像慢] → 第 1 周就把镜像拉好；测试基类只启动一次容器，供同一个上下文里的测试复用。
- [一次引入较多依赖，一时消化不了] → 任务要求每加一个依赖写一句用途；不要求第一周就理解 Spring Security 和 Redis 的细节。
- [`/api/admin/locales` 暂时不需要登录] → 下一个变更的第一件事就是接入 Security，并补上 401 的测试。
