# API 约定

## 约定

- 管理端接口以 `/api/admin` 开头，除登录外都需要登录。展示端接口以 `/api/portal` 开头，不需要登录。
- 登录态放在 httpOnly Cookie `dochub_token` 里，有效期 8 小时。
- 响应统一为 `{ "code": 0, "message": "ok", "data": … }`。

**错误码与 HTTP 状态**

| HTTP | code | 用于 |
|---|---|---|
| 400 | 40001 | 参数或业务校验失败（`data` 里带字段明细） |
| 401 | 40101 | 未登录、令牌无效或过期、用户被禁用 |
| 403 | 40301 | 已登录但无权操作（角色不够，或数据不在你负责的产品线里） |
| 404 | 40401 | 资源不存在。展示端访问未上线版本、未发布文档时也返回 404 |
| 409 | 40901 | 冲突：唯一键重复、删除非空分类、删除已发布文档、未持有编辑锁 |
| 500 | 50001 | 未知错误，响应里不带堆栈 |

**权限缩写**

- **管理员**：只有系统管理员。
- **成员**：系统管理员，或被分配到该产品线的编辑。
- **持锁**：是成员，并且持有该语言版本的编辑锁（请求头 `X-Lock-Token` 带自己的锁令牌）。

## 认证

| 方法 | 路径 | 说明 | 权限 | 关键校验 |
|---|---|---|---|---|
| POST | `/api/admin/auth/login` | 登录，成功后写 Cookie | 公开 | 用户存在、已启用、密码正确；失败提示不区分原因 |
| POST | `/api/admin/auth/logout` | 清除 Cookie | 已登录 | |
| GET | `/api/admin/auth/me` | 当前用户和被分配的产品线 | 已登录 | |

## 用户

| 方法 | 路径 | 说明 | 权限 | 关键校验 |
|---|---|---|---|---|
| GET | `/api/admin/users?keyword&page&size` | 分页查询 | 管理员 | |
| POST | `/api/admin/users` | 新增 | 管理员 | 用户名唯一；角色合法；密码不少于 8 位 |
| PUT | `/api/admin/users/{id}` | 改资料、角色、产品线、启用状态 | 管理员 | 不能禁用或降级自己 |
| POST | `/api/admin/users/{id}/reset-password` | 重置密码 | 管理员 | 不能少于 8 位 |

## 产品线与版本

| 方法 | 路径 | 说明 | 权限 | 关键校验 |
|---|---|---|---|---|
| GET | `/api/admin/product-lines` | 列表；编辑只能拿到被分配的 | 已登录 | |
| GET | `/api/admin/product-lines/{id}` | 详情 | 成员 | 数据级 |
| POST | `/api/admin/product-lines` | 新增 | 管理员 | `code` 唯一；默认语言合法 |
| PUT | `/api/admin/product-lines/{id}` | 改名称、排序、启停 | 管理员 | `code` 不可改 |
| GET | `/api/admin/product-lines/{plId}/versions` | 版本列表，带文档数和未发布修改数 | 成员 | 数据级 |
| POST | `/api/admin/product-lines/{plId}/versions` | 新建空白版本 | 管理员 | 同一产品线内名称唯一 |
| PUT | `/api/admin/product-versions/{id}` | 改名、排序 | 管理员 | 同上 |
| POST | `/api/admin/product-versions/{id}/go-live` | 上线 | 管理员 | |
| POST | `/api/admin/product-versions/{id}/take-offline` | 下线 | 管理员 | |
| POST | `/api/admin/product-versions/{id}/clone` | 复制为新版本 | 管理员 | 新名称唯一；整版复制在一个事务里 |
| DELETE | `/api/admin/product-versions/{id}` | 删除 | 管理员 | 只允许未上线且没有任何文档的版本 |

## 分类与文档

| 方法 | 路径 | 说明 | 权限 | 关键校验 |
|---|---|---|---|---|
| GET | `/api/admin/product-versions/{vId}/tree` | 完整目录树，带每个语言版本的状态 | 成员 | 数据级 |
| POST | `/api/admin/categories` | 新增 | 成员 | 默认语言的名称必填；上级分类在同一版本 |
| PUT | `/api/admin/categories/{id}` | 改各语言名称 | 成员 | |
| POST | `/api/admin/categories/{id}/move` | 移动并指定位置 | 成员 | 目标在同一版本；不能移到自己或自己的子孙下 |
| DELETE | `/api/admin/categories/{id}` | 删除 | 成员 | 必须没有子分类和文档 |
| POST | `/api/admin/documents` | 新建，同时建默认语言版本 | 成员 | 标题必填；分类与版本一致 |
| POST | `/api/admin/documents/{id}/move` | 移动并指定位置 | 成员 | 目标分类在同一版本 |
| DELETE | `/api/admin/documents/{id}` | 删除 | 成员 | 没有任何已发布的语言版本 |

## 语言版本、草稿与编辑锁

| 方法 | 路径 | 说明 | 权限 | 关键校验 |
|---|---|---|---|---|
| POST | `/api/admin/documents/{id}/language-versions` | 新建语言版本，预填默认语言的内容 | 成员 | 语言合法；不重复 |
| GET | `/api/admin/language-versions/{id}` | 读取草稿、状态、锁信息 | 成员 | |
| PUT | `/api/admin/language-versions/{id}/draft` | 保存草稿 | 持锁 | 标题必填；正文净化后保存 |
| POST | `/api/admin/language-versions/{id}/lock` | 获取或续期编辑锁 | 成员 | 无人持有、已过期、或本人持有才成功，否则 409 并返回持有者 |
| DELETE | `/api/admin/language-versions/{id}/lock` | 释放编辑锁 | 成员 | 只能释放自己的 |

## 发布与修订

| 方法 | 路径 | 说明 | 权限 | 关键校验 |
|---|---|---|---|---|
| POST | `/api/admin/language-versions/{id}/publish` | 发布 | 持锁 | 草稿标题非空 |
| POST | `/api/admin/language-versions/{id}/unpublish` | 下线，历史保留 | 成员 | |
| GET | `/api/admin/language-versions/{id}/revisions?page&size` | 修订历史 | 成员 | |
| GET | `/api/admin/revisions/{id}` | 查看一条修订 | 成员 | 修订属于该语言版本 |
| POST | `/api/admin/language-versions/{id}/rollback/{revisionId}` | 回滚，立即生效 | 成员 | 修订属于该语言版本 |

## 文件

| 方法 | 路径 | 说明 | 权限 | 关键校验 |
|---|---|---|---|---|
| POST | `/api/admin/files` | 上传图片 | 已登录 | 只允许 png、jpg、jpeg、gif、webp；不超过 10MB |
| GET | `/files/**` | 访问文件 | 公开 | 防路径穿越；`X-Content-Type-Options: nosniff` |

## 展示端

四个接口在查询前都先校验“产品线启用且版本已上线”，不满足返回 404。

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/api/portal/product-lines` | 产品线列表，只含启用且有已上线版本的 |
| GET | `/api/portal/product-lines/{id}/versions` | 已上线的版本，每个带 `availableLocales`（至少有一篇已发布文档的语言） |
| GET | `/api/portal/product-versions/{id}/tree?locale=` | 目录树；名称和标题按语言取，缺失回退默认语言 |
| GET | `/api/portal/product-versions/{id}/documents/{docId}?locale=` | 文档内容 |

## 关键请求与响应示例

**登录**

```http
POST /api/admin/auth/login
{ "username": "editor_a", "password": "********" }
```

```http
HTTP/1.1 200
Set-Cookie: dochub_token=<JWT>; Path=/; HttpOnly; SameSite=Strict; Max-Age=28800

{ "code": 0, "message": "ok",
  "data": { "id": 2, "username": "editor_a", "displayName": "编辑甲", "role": "EDITOR", "productLineIds": [1] } }
```

生产环境的 Cookie 多一个 `Secure`。

**保存草稿（未持锁被拒）**

```http
PUT /api/admin/language-versions/12/draft
X-Lock-Token: 2:5f0c…
{ "title": "快速开始", "body": "<h2>1. 概述</h2><p>…</p>" }
```

```json
{ "code": 40901, "message": "该文档正由他人编辑", "data": { "holder": "编辑乙", "lockedAt": "2026-12-15T10:32:00" } }
```

**目录树（管理端，节选）**

```json
{ "code": 0, "message": "ok",
  "data": [
    { "kind": "category", "id": 31, "names": { "zh-CN": "产品简介", "en-US": "Introduction" },
      "children": [
        { "kind": "document", "id": 120, "docKey": "6f1c…", "categoryId": 31,
          "languageVersions": [
            { "id": 12, "locale": "zh-CN", "title": "FineReport产品简介",
              "published": true, "hasUnpublishedChanges": false, "outdated": false, "lockedBy": null },
            { "id": 13, "locale": "en-US", "title": "Introduction",
              "published": true, "hasUnpublishedChanges": false, "outdated": true, "lockedBy": null } ] } ] } ] }
```

**展示端文档内容（发生回退）**

```json
{ "code": 0, "message": "ok",
  "data": { "documentId": 120, "docKey": "6f1c…",
            "requestedLocale": "en-US", "locale": "zh-CN", "fallback": true,
            "title": "FineReport产品简介", "html": "<h2>1. 概述</h2>…", "updatedAt": "2026-12-15T10:40:00" } }
```

---
