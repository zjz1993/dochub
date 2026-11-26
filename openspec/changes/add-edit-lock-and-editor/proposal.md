# Proposal

## Why

两个人同时打开同一篇文档编辑时，后保存的人会覆盖先保存的人。需要让一个语言版本同一时间只有一个编辑者，并且在编辑者离开后自动放开。这是编辑器页真正可用的前提。

## What Changes

- 编辑锁：获取、续期、释放。保存在 Redis 里，带过期时间。
- 保存草稿和发布必须持有编辑锁。
- 前端的空闲检测：5 分钟无操作就停止续期并转为只读，“继续编辑”时重新上锁。
- 文档编辑器页：接入编辑器、切换语言、自动保存、预览、图片上传、锁状态提示。

## Capabilities

### New Capabilities

无。

### Modified Capabilities
- `document-management`: 新增编辑锁的获取、续期、释放、过期，持锁才能保存，以及编辑器页的锁定体验

## Impact

- 引入 Redis，只用于编辑锁。新增 `content/lock/`。
- `PUT /api/admin/language-versions/{id}/draft` 从此要求请求头带锁令牌。
- 发布接口还没有实现，但持锁校验的入口在这里留好。
- 对应第 6 周，学习重点：租约与心跳、Redis 的原子性与 Lua、跨系统操作的竞态。见 `docs/learning/week-06.md`。
- 为什么是编辑锁、为什么是 Redis，以及它的代价，记录在 ADR-004。
