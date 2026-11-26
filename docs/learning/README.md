# 学习路线

这里是 12 周的安排总览、每周文档的索引，以及学习资料。每个任务要学什么、学到什么程度、看什么资料，都在这里。

## 总览

日期按 **2026-11-30（周一）开工** 排。2027-02-06 是春节，02-05（周五）是除夕，所以保守起见，第 10 周按只有 4 个工作日排：排 8 小时，剩下的 2 小时挪到第 11 周。实际以公布的放假安排为准。如果想让第 10 周有完整的 5 天，提前一周开工即可。

| 周次 | 日期 | 本周目标 | 对应的变更 |
|---|---|---|---|
| 第 1 周 | 11-30 ～ 12-06 | 空项目连上 MySQL 和 Redis，测试脚手架可用 | [`add-engineering-foundation`](../../openspec/changes/add-engineering-foundation/) |
| 第 2 周 | 12-07 ～ 12-13 | 登录可用，接口按角色和数据范围受限 | [`add-access-control`](../../openspec/changes/add-access-control/) |
| 第 3 周 | 12-14 ～ 12-20 | 产品线和版本可管理，管理端第一次联调 | [`add-product-management`](../../openspec/changes/add-product-management/) |
| 第 4 周 | 12-21 ～ 12-27 | 分类树和文档可管理，内容接口都有数据级鉴权 | [`add-category-tree-and-documents`](../../openspec/changes/add-category-tree-and-documents/) |
| 第 5 周 | 12-28 ～ 01-03 | 能写草稿并上传图片 | [`add-language-versions-and-drafts`](../../openspec/changes/add-language-versions-and-drafts/) |
| 第 6 周 | 01-04 ～ 01-10 | 编辑锁可用，编辑器页可用 | [`add-edit-lock-and-editor`](../../openspec/changes/add-edit-lock-and-editor/) |
| 第 7 周 | 01-11 ～ 01-17 | 发布、下线、修订、回滚可用 | [`add-document-publishing`](../../openspec/changes/add-document-publishing/) |
| 第 8 周 | 01-18 ～ 01-24 | 复制版本可用，目录树可在页面上管理 | [`add-version-clone-and-tree-ui`](../../openspec/changes/add-version-clone-and-tree-ui/) |
| 第 9 周 | 01-25 ～ 01-31 | 展示端可用，未上线内容拿不到 | [`add-public-portal`](../../openspec/changes/add-public-portal/) |
| 第 10 周 | 02-01 ～ 02-04 | 上线，原有服务不受影响（4 天） | [`add-deployment`](../../openspec/changes/add-deployment/) |
| 第 11、12 周 | 02-08 ～ 02-21 | 缓冲 | 无 |

## 每周文档

- [第 1 周：空项目连上 MySQL 和 Redis，测试脚手架可用](./week-01.md)｜`add-engineering-foundation`
- [第 2 周：登录可用，接口按角色和数据范围受限](./week-02.md)｜`add-access-control`
- [第 3 周：产品线和版本可管理，管理端第一次联调](./week-03.md)｜`add-product-management`
- [第 4 周：分类树和文档可管理，内容接口都有数据级鉴权](./week-04.md)｜`add-category-tree-and-documents`
- [第 5 周：能写草稿并上传图片](./week-05.md)｜`add-language-versions-and-drafts`
- [第 6 周：编辑锁可用，编辑器页可用](./week-06.md)｜`add-edit-lock-and-editor`
- [第 7 周：发布、下线、修订、回滚可用](./week-07.md)｜`add-document-publishing`
- [第 8 周：复制版本可用，目录树可在页面上管理](./week-08.md)｜`add-version-clone-and-tree-ui`
- [第 9 周：展示端可用，未上线内容拿不到](./week-09.md)｜`add-public-portal`
- [第 10 周：上线，原有服务不受影响](./week-10.md)｜`add-deployment`
- [第 11 周：缓冲](./week-11.md)
- [第 12 周：缓冲](./week-12.md)

每周文档包含：本周目标、每天怎么排、任务对应的知识点和资料、本周验收，以及一份留给你的复盘记录。任务本身（做什么、怎么验证）在对应变更的 `tasks.md` 里。

## 缓冲周怎么用

1. **第一用途**：补前面任何一周没达标的任务。
2. **第二用途**（第 10 周结束时全部验收通过才做）：按这个顺序从第二档里选，做满为止。
   1. 全文搜索（标题模糊匹配，约 4 小时）
   2. 端到端冒烟测试（约 3 小时）
   3. 刷新令牌（约 3 小时）
   4. 修订对比（约 4 小时）
   5. 迁移到 Spring Boot 4.1（约 6 小时）
   6. 审核流程（约 10 小时，放最后）
3. 每个阶段结束时的复盘也占用这段时间。

## 资料索引

任务里用编号引用。链接在 2026-11-24 核对过能打开；标注“本机访问超时”的两条是网络原因，链接本身有效。

| 编号 | 资料 |
|---|---|
| R1 | [Spring Boot 3.5 参考文档](https://docs.spring.io/spring-boot/3.5/index.html) |
| R2 | [Spring Boot 外部化配置](https://docs.spring.io/spring-boot/3.5/reference/features/external-config.html) |
| R3 | [Spring Boot Profiles](https://docs.spring.io/spring-boot/3.5/reference/features/profiles.html) |
| R4 | [Spring Boot 的 Web MVC 与错误处理](https://docs.spring.io/spring-boot/3.5/reference/web/servlet.html) |
| R5 | [Spring Framework 参数校验](https://docs.spring.io/spring-framework/reference/6.2/core/validation/beanvalidation.html) |
| R6 | [MDN：409 Conflict](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status/409) |
| R7 | [Spring Boot 对 Flyway 的支持](https://docs.spring.io/spring-boot/3.5/reference/data/sql.html) |
| R8 | [MySQL 外键约束](https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html) |
| R9 | [MyBatis-Plus 安装](https://baomidou.com/getting-started/install/) |
| R10 | [MyBatis-Plus CRUD 接口](https://baomidou.com/guides/data-interface/) |
| R11 | [MyBatis-Plus 条件构造器](https://baomidou.com/guides/wrapper/) |
| R12 | [MyBatis-Plus 自动填充](https://baomidou.com/guides/auto-fill-field/) |
| R13 | [MyBatis-Plus 分页插件](https://baomidou.com/plugins/pagination/) |
| R14 | [Spring Boot 的 Testcontainers 支持](https://docs.spring.io/spring-boot/3.5/reference/testing/testcontainers.html) |
| R15 | [Testcontainers MySQL 模块](https://java.testcontainers.org/modules/databases/mysql/) |
| R16 | [Spring Security 6.5 架构](https://docs.spring.io/spring-security/reference/6.5/servlet/architecture.html) |
| R17 | [Spring Security 认证架构](https://docs.spring.io/spring-security/reference/6.5/servlet/authentication/architecture.html) |
| R18 | [Spring Security 密码存储](https://docs.spring.io/spring-security/reference/6.5/servlet/authentication/passwords/index.html) |
| R19 | [OWASP 密码存储](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) |
| R20 | [jwt.io 入门](https://jwt.io/introduction) |
| R21 | [jjwt 仓库与示例](https://github.com/jwtk/jjwt) |
| R22 | [OWASP JWT](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_Cheat_Sheet.html) |
| R23 | [Spring Security CSRF](https://docs.spring.io/spring-security/reference/6.5/servlet/exploits/csrf.html) |
| R24 | [OWASP 会话管理](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html) |
| R25 | [Spring Security 方法级安全](https://docs.spring.io/spring-security/reference/6.5/servlet/authorization/method-security.html) |
| R26 | [OWASP 授权](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html) |
| R27 | [OWASP 越权访问](https://cheatsheetseries.owasp.org/cheatsheets/Insecure_Direct_Object_Reference_Prevention_Cheat_Sheet.html) |
| R28 | [MySQL 事务隔离级别](https://dev.mysql.com/doc/refman/8.0/en/innodb-transaction-isolation-levels.html) |
| R29 | [MySQL 递归 CTE](https://dev.mysql.com/doc/refman/8.0/en/with.html) |
| R30 | [Jsoup Safelist 净化](https://jsoup.org/cookbook/cleaning-html/safelist-sanitizer) |
| R31 | [OWASP XSS 防护](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) |
| R32 | [OWASP 文件上传](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html) |
| R33 | [Spring MVC 文件上传（Baeldung）](https://www.baeldung.com/spring-file-upload) |
| R34 | [Redis 分布式锁模式](https://redis.io/docs/latest/develop/clients/patterns/distributed-locks/) |
| R35 | [Redis SET 命令](https://redis.io/docs/latest/commands/set/) |
| R36 | [Redis EVAL 与 Lua](https://redis.io/docs/latest/develop/interact/programmability/eval-intro/) |
| R37 | [Spring Data Redis](https://docs.spring.io/spring-data/redis/reference/redis.html) |
| R38 | [Spring 声明式事务注解](https://docs.spring.io/spring-framework/reference/6.2/data-access/transaction/declarative/annotations.html) |
| R39 | [Spring 事务总览](https://docs.spring.io/spring-framework/reference/6.2/data-access/transaction.html) |
| R40 | [Docker Compose 文档](https://docs.docker.com/compose/)（本机访问超时） |
| R41 | [Docker 的 Java 指南](https://docs.docker.com/language/java/)（本机访问超时） |
| R42 | [Spring Boot 打包与容器镜像](https://docs.spring.io/spring-boot/3.5/how-to/build.html) |
| R43 | [Next.js 文档](https://nextjs.org/docs) |
| R44 | [Ant Design 在 Next.js 中的用法](https://ant.design/docs/react/use-with-next) |
| R45 | [springdoc-openapi](https://springdoc.org/) |

## 每个知识点要学到什么程度

| 知识点 | 任务 | 程度 |
|---|---|---|
| 依赖管理、starter、Profile、外部化配置 | 第 1 周 2.1、2.2 | 必须理解 |
| 统一返回、异常处理、参数校验 | 3.1、3.2 | 必须理解 |
| 分层架构、各层职责 | 4.2 起全程 | 必须理解 |
| 数据库迁移 | 4.1 及每个表设计任务 | 必须理解 |
| 表设计：主键、唯一约束、外键、索引 | 第 2 周 1.1、第 3 周 2.1、第 4 周 1.1、第 5 周 1.1、第 7 周 1.1 | 必须理解 |
| SQL：增删改查、联表、分页 | 全程 | 必须理解 |
| 树的存储与组装 | 第 4 周 2.1、2.2 | 必须理解 |
| 密码哈希 | 第 2 周 2.1 | 理解原理，会用接口 |
| JWT、过滤器链、Cookie 与 CSRF | 2.2、3.1 | 必须理解 |
| 接口级鉴权与数据级鉴权 | 4.1、第 3 周 1.2、第 4 周 4.1、第 9 周 1.1 | 必须理解 |
| 事务与 `@Transactional` | 第 4 周 2.2、第 5 周 1.2、第 7 周 2.1、第 8 周 1.2 | 必须理解 |
| 事务隔离级别与数据库锁 | 第 7 周 2.1 | 了解即可 |
| Redis 的过期时间、`SET NX`、Lua | 第 6 周 1.2 | 必须理解 |
| 租约与心跳 | 1.1 到 1.4 | 必须理解 |
| HTML 净化与 XSS | 第 5 周 2.1 | 必须理解 |
| 文件上传安全 | 3.1 | 必须理解 |
| 快照与不可变修订 | 第 7 周 1.1 到 2.2 | 必须理解 |
| 读模型与回退查询 | 第 9 周 1.1 | 必须理解 |
| 单元测试与集成测试 | 全程 | 必须理解 |
| HTTP 状态码的语义 | 全程 | 必须理解 |
| MyBatis-Plus | 第 1 周 4.2 起全程 | 会用 |
| Testcontainers | 5.1 | 会用 |
| jjwt | 第 2 周 2.2 | 会用 |
| Jsoup | 第 5 周 2.1 | 会用 |
| Docker 镜像与 Compose | 第 1 周 1.1、第 10 周 1.1、2.2 | 理解基本概念，会用 |
| nginx 反向代理 | 2.2 | 会用 |
| 备份与恢复 | 3.1 | 会用 |
| springdoc | 第 1 周 2.1 | 会用 |
| 递归 CTE、窗口函数 | — | 暂不深入：树在内存里组装 |
| 缓存、连接池与 JVM 调优 | — | 暂不深入 |
| 消息队列、微服务、分布式事务 | — | 暂不深入 |
| Elasticsearch | — | 暂不深入 |

---
