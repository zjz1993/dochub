# Tasks

> 规格在 `specs/`，技术方案在 [design.md](./design.md)，本周的学习目标、知识点和资料见 [week-01.md](../../../docs/learning/week-01.md)。
> 耗时是你投入的时间；“你写 / 你设计 / AI 写 / 你操作”的约定见 [development-guide](../../../docs/development-guide.md)。

## 1. 环境与仓库

- [x] 1.1 **环境准备**（1.5h｜AI 起草命令，你执行｜前置：无）：在仓库里用 jenv 锁定 JDK 21，确认 `java -version` 和 `mvn -v` 都是 21；用 `deploy/compose.dev.yml` 启动 MySQL 8.4 和 Redis 7，各挂一个数据卷；把需要的环境变量记到 `.env.example`。 验证：容器重启后数据还在；两个容器都在运行；从宿主机能连上 MySQL。
  - 涉及：`deploy/compose.dev.yml`、`.env.example`、`.java-version`。
- [x] 1.3 **前端工程初始化**（0.5h｜AI 写，你跑｜前置：无）：在 `frontend/` 建 Next.js 16 应用（pnpm、TypeScript、App Router、ESLint，不用 Tailwind）；接入 Ant Design 6 和 `AntdRegistry`；开发环境把 `/api`、`/files` 转发给后端，后端地址由环境变量 `BACKEND_ORIGIN` 指定。不含登录、布局和页面，它们在第 3 周。 验证：`pnpm dev` 后首页显示一个 Ant Design 按钮，查看网页源代码时样式已经在 HTML 里；`pnpm build` 通过；后端启动后，访问 `localhost:3000/api/admin/locales` 能拿到后端的响应。
  - 涉及：`frontend/package.json`、`frontend/next.config.ts`、`frontend/app/layout.tsx`。
- [ ] 1.2 **仓库初始化**（0.5h｜AI 起草｜前置：任务 1.1）：`git init`；建立 `backend/`、`frontend/` 目录；写 `.gitignore`；首次提交。 验证：`git status` 干净，`git log` 有第一条提交。

## 2. 后端骨架

- [ ] 2.1 **创建 Spring Boot 项目并读懂 pom**（1h｜AI 起草，你逐项读｜前置：任务 1.2）：Spring Boot 3.5.16、Java 21、Maven。先用 start.spring.io 生成只含 web、actuator、validation 的项目并跑起来；再手工加入 `docs/architecture.md` 技术选型里其余依赖。每加一个依赖，在笔记里写一句它的用途。 验证：能对 pom 里每个依赖说出用途；`./mvnw spring-boot:run` 启动后 `/actuator/health` 返回 `UP`。
  - 涉及：`backend/pom.xml`、`backend/.mvn/`、启动类。
- [ ] 2.2 **配置文件与多环境**（1h｜AI 起草，你改｜前置：任务 2.1）：`application.yml` 放公共配置，`application-dev.yml`、`application-prod.yml` 各放差异；数据库密码、JWT 密钥、文件目录全部走环境变量。 验证：启动日志能看到当前 profile；仓库里搜不到明文密钥；`.env.example` 列全了变量。
  - 涉及：`backend/src/main/resources/application*.yml`。

## 3. 统一约定

- [ ] 3.1 **统一返回结构与错误码**（1h｜AI 写，你审｜前置：任务 2.1）：`ApiResponse<T>`（`code`、`message`、`data`）；`ErrorCode` 枚举；`BizException`。 验证：你能解释 `code` 和 HTTP 状态各自负责什么，并写出 400、401、409 三个例子的响应体。 测试：与任务 3.2 一起
  - 涉及：`common/`。
- [ ] 3.2 **全局异常处理与参数校验**（1h｜AI 写骨架，你补校验注解和测试｜前置：任务 3.1）：`@RestControllerAdvice` 处理业务异常、参数校验失败、唯一键冲突、未知异常；在一个临时接口上用 `@Valid`、`@NotBlank`、`@Size`。 验证：缺参数返回 400 并带字段提示；唯一键冲突返回 409；500 的响应体里没有堆栈。 测试：3 条 MockMvc 测试（400、409、500）

## 4. 数据访问与迁移

- [ ] 4.1 **Flyway 接入与第一张迁移**（1.5h｜你写迁移，AI 写配置｜前置：任务 2.2）：配置数据源；写 `V1__init_locale.sql`，建 `locale` 表并插入 zh-CN、en-US、ja-JP；启动验证。 验证：库里出现 `locale` 表和 `flyway_schema_history`；故意改一次 V1 的内容，启动报校验错误，再还原。
- [ ] 4.2 **MyBatis-Plus 接入与分层约定**（1.5h｜AI 写配置，你写三层｜前置：任务 4.1）：配置分页插件和 `created_at`、`updated_at` 自动填充；实现 `GET /api/admin/locales`，按 Controller → Service → Mapper 走一遍。鉴权第 2 周才接上，暂时放行。 验证：接口返回 3 种语言；你能画出一次请求经过的类。 测试：1 条集成测试，放到任务 5.1 的基类上

## 5. 测试基线

- [ ] 5.1 **集成测试脚手架**（1h｜AI 写，你跑｜前置：任务 3.2、任务 4.1）：`IntegrationTestBase`：`@SpringBootTest` 加 MockMvc，用 Testcontainers 起真实的 MySQL（启动时自动跑 Flyway）和 Redis；第一条测试验证应用能起来。 验证：`./mvnw test` 全绿；测试结束后容器被清理。 测试：本任务就是测试
