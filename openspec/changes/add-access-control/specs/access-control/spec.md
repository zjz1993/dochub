# Spec Delta

## Purpose

规定谁可以进入管理端、能做什么：登录与登录态、系统管理员和编辑两种固定角色、用户与产品线成员的管理，以及管理端接口的访问限制。展示端不需要登录，不在本能力范围内。

## ADDED Requirements

### Requirement: 密码存储
用户密码 MUST 以 BCrypt 哈希的形式存储。系统任何位置都不得保存或输出明文密码。

#### Scenario: 新建用户后的存储
- **WHEN** 系统管理员新建一个用户
- **THEN** 数据库中该用户的密码字段是 BCrypt 哈希串

### Requirement: 登录
系统 SHALL 提供 `POST /api/admin/auth/login`。用户名存在、账号已启用且密码正确时登录成功；任一条件不满足时登录失败，并且返回相同的失败提示。

#### Scenario: 登录成功
- **WHEN** 已启用的用户提交正确的用户名和密码
- **THEN** 返回该用户的基本信息，并写入登录 Cookie

#### Scenario: 密码错误
- **WHEN** 用户提交错误的密码
- **THEN** 返回 401 和统一的失败提示，不写入 Cookie

#### Scenario: 用户不存在
- **WHEN** 用户提交不存在的用户名
- **THEN** 响应的状态码和提示与密码错误时完全一致

#### Scenario: 账号被禁用
- **WHEN** 被禁用的用户提交正确的用户名和密码
- **THEN** 登录失败，不写入 Cookie

### Requirement: 登录态载体
登录态 SHALL 保存在名为 `dochub_token` 的 httpOnly Cookie 中，有效期为 8 小时，`SameSite` 为 `Strict`；生产环境下 Cookie MUST 带 `Secure`。页面脚本不得能读取登录态。

#### Scenario: 页面脚本读取登录态
- **WHEN** 登录成功后在浏览器控制台执行 `document.cookie`
- **THEN** 结果中不包含 `dochub_token`

#### Scenario: 在生产环境登录
- **WHEN** 以 prod profile 运行的应用处理一次登录成功
- **THEN** 下发的 Cookie 带有 `Secure` 和 `HttpOnly` 属性

### Requirement: 登出
系统 SHALL 提供 `POST /api/admin/auth/logout`，清除登录 Cookie。

#### Scenario: 登出后再次请求
- **WHEN** 已登录用户登出后不带 Cookie 请求管理接口
- **THEN** 返回 401

### Requirement: 管理端接口需要登录
除登录接口、展示端接口、文件访问和健康检查外，所有接口 SHALL 要求有效的登录态。未登录、令牌无效或令牌过期时返回 401。

#### Scenario: 未登录访问管理接口
- **WHEN** 不带 Cookie 请求 `GET /api/admin/locales`
- **THEN** 返回 401

#### Scenario: 令牌被篡改
- **WHEN** 带着载荷或签名被修改过的令牌请求管理接口
- **THEN** 返回 401

#### Scenario: 令牌过期
- **WHEN** 带着已超过有效期的令牌请求管理接口
- **THEN** 返回 401

#### Scenario: 健康检查不需要登录
- **WHEN** 不带 Cookie 请求 `GET /actuator/health`
- **THEN** 返回 200

### Requirement: 禁用即时生效
用户被禁用后，其登录态 SHALL 在下一次请求时失效。

#### Scenario: 禁用已登录的用户
- **WHEN** 系统管理员禁用一个已登录的用户，该用户随即带着原 Cookie 请求管理接口
- **THEN** 返回 401

### Requirement: 当前用户信息
系统 SHALL 提供 `GET /api/admin/auth/me`，返回当前用户的 id、用户名、显示名、角色和被分配的产品线。

#### Scenario: 查询当前用户
- **WHEN** 已登录用户请求 `GET /api/admin/auth/me`
- **THEN** 返回该用户的资料、角色和产品线列表

### Requirement: 用户管理仅限系统管理员
用户的新增、修改、重置密码和查询 SHALL 仅对系统管理员开放。

#### Scenario: 编辑调用用户管理
- **WHEN** 角色为编辑的用户请求用户列表
- **THEN** 返回 403

#### Scenario: 系统管理员新建用户
- **WHEN** 系统管理员提交合法的用户名、密码、显示名和角色
- **THEN** 用户创建成功，密码以哈希形式保存

### Requirement: 用户名唯一与密码长度
新增用户时用户名已被占用 SHALL 返回 409。密码 MUST 不少于 8 位，否则返回 400。

#### Scenario: 重复的用户名
- **WHEN** 新增用户时使用已存在的用户名
- **THEN** 返回 409，不创建用户

#### Scenario: 密码过短
- **WHEN** 新增用户时密码少于 8 位
- **THEN** 返回 400，并指出密码字段不合法

### Requirement: 禁用与降级的自我保护
系统 MUST NOT 允许系统管理员禁用自己，或把自己的角色改为编辑。

#### Scenario: 禁用自己
- **WHEN** 系统管理员请求禁用自己的账号
- **THEN** 请求被拒绝并返回 400，账号状态不变

#### Scenario: 把自己降级为编辑
- **WHEN** 系统管理员修改自己账号的角色为编辑
- **THEN** 请求被拒绝并返回 400，角色不变

### Requirement: 产品线成员分配
系统管理员 SHALL 能为编辑分配或移除产品线。提交的产品线列表作为该编辑的完整成员集合保存；一个编辑与一条产品线的成员关系 MUST 唯一。

#### Scenario: 替换成员集合
- **WHEN** 系统管理员把编辑甲的产品线列表改为 `[1, 3]`
- **THEN** 编辑甲此后只被分配到产品线 1 和 3，原有的其他分配被移除

### Requirement: 用户分页查询
`GET /api/admin/users` SHALL 支持按关键字筛选和分页，返回总数、当前页码和用户列表。

#### Scenario: 翻页
- **WHEN** 以 `page=2&size=10` 查询用户
- **THEN** 返回第 2 页最多 10 条记录，以及总数

### Requirement: 种子数据只用于开发
预置的开发账号 MUST 只在 dev 环境创建。以 prod 环境启动时，系统不得创建预置的开发账号。

#### Scenario: 以生产配置启动
- **WHEN** 以 prod profile 启动应用
- **THEN** 用户表中没有任何预置的开发账号
