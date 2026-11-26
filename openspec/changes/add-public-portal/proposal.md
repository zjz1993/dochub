# Proposal

## Why

读者需要一个不用登录的展示端：选产品线、切版本、切语言，在目录树里浏览文档。展示端只展示已上线版本的已发布内容；读者要的语言没有时，回退到默认语言并给出提示。

## What Changes

- 四个公开的只读接口：产品线、版本、目录树、文档内容。
- 访问控制：未上线的版本、已停用的产品线、未发布的文档，一律返回 404。
- 默认语言回退：标题、分类名称、正文都按语言取，缺失时回退并标记。
- 展示端页面：服务端渲染，地址形如 `/{产品线code}/v{版本id}/{docKey}?locale=`。

## Capabilities

### New Capabilities
- `public-portal`: 面向读者的只读展示

### Modified Capabilities

无。

## Impact

- 新增 `portal/` 包，以及 `frontend/app/(portal)/` 下的页面。
- 展示端的接口在 Spring Security 里放行，并且不读取任何草稿数据。
- 不新增表。
- 对应第 9 周，学习重点：读模型与写模型的区别、回退查询、按语言取值的树。见 `docs/learning/week-09.md`。
