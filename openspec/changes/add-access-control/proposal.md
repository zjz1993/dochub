# Proposal

## Why

管理端只能让公司内部人员使用，而且编辑只能动自己负责的产品线。现在所有接口都是公开的，也没有“当前用户”的概念。展示端要公开放到互联网上，登录和权限必须先立起来，后面的内容接口才有统一的归属校验入口。

## What Changes

- 登录、登出、当前用户三个接口。登录态放在 httpOnly Cookie 里的 JWT 中。
- Spring Security 接入：除登录、展示端、文件和健康检查外，所有接口需要登录。
- 两种固定角色：系统管理员、编辑。用户管理只对系统管理员开放。
- 产品线成员分配：决定一个编辑能访问哪些产品线。
- 只在 dev 环境创建的开发种子账号，以及测试里的登录辅助。

## Capabilities

### New Capabilities
- `access-control`: 登录与登录态、角色限制、用户与成员管理、管理端接口的访问控制

### Modified Capabilities

无。数据范围校验（编辑能访问哪些产品线）在 `add-product-management` 里加入本能力。

## Impact

- 新增表 `app_user`、`product_line`、`user_product_line`，见 `docs/database-conventions.md`。`product_line` 在这里只建表，接口在下一个变更实现。
- 新增 `auth/`、`user/` 两个包和 Spring Security 配置。
- `GET /api/admin/locales` 从此需要登录。
- 令牌由 Cookie 携带，所以前后端必须同源，见 `docs/architecture.md`。
- 对应第 2 周，学习重点：密码哈希、JWT、过滤器链、Cookie 与 CSRF、方法级鉴权。见 `docs/learning/week-02.md`。
