# Proposal

## Why

产品版本下面需要一棵可以嵌套的分类树，文档挂在分类下。读者靠这棵树导航，编辑靠它组织内容。分类名称还要按语言分别保存，否则英文界面上会出现中文目录。

## What Changes

- 分类：新增（必须带默认语言的名称）、按语言改名、删除（必须为空）、移动和排序。
- 目录树查询：一次取回某个版本的完整结构。
- 文档：新建（生成跨版本稳定的 `doc_key`）、移动、删除。
- 分类和文档的全部接口纳入数据范围校验。

## Capabilities

### New Capabilities
- `document-management`: 产品版本内的文档结构——分类树、分类名称、文档的身份与位置

### Modified Capabilities

无。

## Impact

- 新增表 `category`、`category_name`、`document`。
- 新增 `category/`、`document/` 两个包；`AccessChecker` 增加按分类和文档判断的方法。
- 文档此刻只有身份，没有标题和正文。新建文档时创建默认语言版本、已发布文档不可删除，分别在 `add-language-versions-and-drafts` 和 `add-document-publishing` 补上，代码里留 TODO。
- 对应第 4 周，学习重点：树的存储与组装、环检测、不变量的校验。见 `docs/learning/week-04.md`。
