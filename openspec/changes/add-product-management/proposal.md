# Proposal

## Why

文档归属于产品线下的某个产品版本。没有产品线和版本，后面的分类、文档、发布都没有归属，编辑的权限范围也没有依据。这是内容体系的根，也是“编辑只能看到自己负责的产品线”这条规则第一次落地的地方。

## What Changes

- 产品线：新增、修改、排序、启停、列表、详情。不提供删除。
- 数据范围校验：编辑只能访问被分配的产品线，列表只返回有权访问的部分。
- 产品版本：新建、改名、排序、上线、下线、受限的删除。
- 管理端应用本身：登录页、布局菜单，以及用户、产品线、版本三张管理页。前端工程本身已在前一个变更建好。

## Capabilities

### New Capabilities
- `product-management`: 产品线和产品版本的管理

### Modified Capabilities
- `access-control`: 新增“数据范围校验”和“列表只返回有权访问的数据”两条需求，产品线成为数据范围的单位

## Impact

- 新增表 `product_version`。`product_line` 的表已在上一个变更建立，这里补上接口。
- 新增 `productline/`、`productversion/` 两个包和 `access/` 下的 `AccessChecker`。
- 在 `frontend/` 里新增管理端的页面和请求封装。
- 版本列表先留出“文档数、未发布修改数”两个字段，计算在 `add-version-clone-and-tree-ui` 补上。
- 对应第 3 周，学习重点：数据级鉴权、联合唯一约束、状态流转。见 `docs/learning/week-03.md`。
