# Spec Delta

## Purpose

规定 DocHub 后端工程骨架的共同约定：接口响应的统一结构、错误到状态码的映射、参数校验、多环境配置、数据库迁移、健康检查和测试基线。后续所有能力都建立在这些约定之上。

## ADDED Requirements

### Requirement: 统一响应结构
所有后端接口 SHALL 返回 `{ code, message, data }` 结构。成功时 `code` 为 0、HTTP 状态为 200；业务错误时 `code` 为对应的业务码，HTTP 状态与错误类型一致。

#### Scenario: 成功响应
- **WHEN** 客户端调用一个成功的接口
- **THEN** HTTP 状态为 200，响应体为 `{ "code": 0, "message": "ok", "data": … }`

#### Scenario: 业务错误响应
- **WHEN** 接口因业务规则被拒绝，例如唯一键重复
- **THEN** HTTP 状态为 409，响应体 `code` 为 40901，`message` 说明原因

### Requirement: 参数校验失败
接口参数校验失败时，系统 SHALL 返回 HTTP 400、`code` 为 40001，并在 `data` 中给出每个不合法字段的名称和原因。

#### Scenario: 缺少必填字段
- **WHEN** 请求体缺少标注为必填的字段
- **THEN** 返回 400，`data` 中列出该字段和“不能为空”的提示

#### Scenario: 字段超出长度限制
- **WHEN** 请求体中某个字段的长度超过上限
- **THEN** 返回 400，`data` 中指出该字段

### Requirement: 未知异常不泄露内部信息
接口发生未预期的异常时，系统 SHALL 返回 HTTP 500、`code` 为 50001 的统一响应。响应体 MUST NOT 包含堆栈、类名或 SQL 语句。

#### Scenario: 接口内部抛出未处理的异常
- **WHEN** 接口内部抛出未被捕获的运行时异常
- **THEN** 返回 500 和通用的错误信息，响应体中不含堆栈

### Requirement: 多环境配置
系统 SHALL 通过 Spring profile 区分开发和生产配置。数据库密码、JWT 密钥、文件目录等敏感配置 MUST 来自环境变量，仓库中不得出现明文密钥。

#### Scenario: 以生产配置启动
- **WHEN** 以 prod profile 启动应用，并通过环境变量提供全部必需的配置
- **THEN** 应用使用环境变量里的数据库密码和 JWT 密钥正常启动

#### Scenario: 检查仓库中的配置
- **WHEN** 在仓库的配置文件里查找数据库密码和 JWT 密钥的取值
- **THEN** 只能找到环境变量引用或占位符

### Requirement: 健康检查
系统 SHALL 提供无需登录的健康检查接口 `GET /actuator/health`，供容器编排判断应用是否存活。

#### Scenario: 应用启动后检查
- **WHEN** 未登录的客户端请求 `GET /actuator/health`
- **THEN** 返回 HTTP 200，状态为 UP

### Requirement: 数据库迁移自动执行
系统 SHALL 在启动时自动执行尚未执行的数据库迁移脚本。已执行过的迁移脚本 MUST NOT 被修改；内容与执行记录不一致时，应用启动失败。

#### Scenario: 在空数据库上首次启动
- **WHEN** 在空数据库上启动应用
- **THEN** 迁移脚本按版本顺序执行，数据库中出现迁移记录表和语言字典表

#### Scenario: 已执行的迁移被改动
- **WHEN** 修改一个已经执行过的迁移脚本后重启应用
- **THEN** 应用启动失败，日志说明校验和不一致

### Requirement: 语言字典
系统 SHALL 预置语言字典，至少包含 `zh-CN`、`en-US`、`ja-JP`，并通过 `GET /api/admin/locales` 返回全部语言的代码和显示名。

#### Scenario: 查询语言列表
- **WHEN** 请求 `GET /api/admin/locales`
- **THEN** 返回 3 种语言，每种包含语言代码和显示名

### Requirement: 集成测试基线
集成测试 SHALL 运行在真实的 MySQL 和 Redis 上：由 Testcontainers 启动，测试结束后销毁。`./mvnw test` 在装有 Docker 的干净环境里 MUST 全部通过。

#### Scenario: 运行全部测试
- **WHEN** 执行 `./mvnw test`
- **THEN** 测试自动启动临时容器、执行迁移，全部通过，结束后临时容器被清理
