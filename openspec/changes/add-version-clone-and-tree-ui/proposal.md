# Proposal

## Why

产品发新版本时，大部分文档沿用上一版。需要一键从已有的版本复制出完整的新版本，包括分类、文档、草稿和已发布内容，编辑只改有变化的部分。管理端还需要一个能拖拽的目录树页面，否则建几十个分类和文档的效率太低。

## What Changes

- 复制版本：在一个事务里复制整个结构。新版本未上线，已发布的状态保留，译文过期的状态保持一致。
- 版本列表的统计：文档数、有未发布修改的语言版本数。
- 目录树管理页：分类与文档的增删改、拖拽排序和移动、状态标记、按语言编辑分类名称。
- 复制版本的入口。

## Capabilities

### New Capabilities

无。

### Modified Capabilities
- `product-management`: 新增复制版本和版本列表统计的需求
- `document-management`: 新增目录树管理页和状态标记的需求

## Impact

- `productversion/` 增加复制逻辑，这是全项目写入步骤最多的一个事务。
- 不新增表。
- 对应第 8 周，学习重点：批量写入的事务边界、新旧 id 映射。见 `docs/learning/week-08.md`。
- 为什么复制而不是版本间共享内容，见 `docs/decisions/ADR-002-document-versioning.md`。
