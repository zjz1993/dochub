# Spec Delta

## Purpose

管理文档正文里用到的图片：已登录的内部人员上传图片并得到可访问的地址，读者在展示端通过这个地址读取图片。存储方式藏在接口后面，可以替换。

## ADDED Requirements

### Requirement: 上传图片
系统 SHALL 提供 `POST /api/admin/files` 给已登录用户上传图片，并返回可访问的 URL。允许的类型为 png、jpg、jpeg、gif、webp，单张不超过 10MB。

#### Scenario: 上传成功
- **WHEN** 已登录用户上传一张 2MB 的 png
- **THEN** 返回 200，响应里带有一个可以通过 `GET` 访问的 URL

#### Scenario: 未登录上传
- **WHEN** 未登录用户上传图片
- **THEN** 返回 401

#### Scenario: 类型不允许
- **WHEN** 已登录用户上传一个 svg 文件
- **THEN** 返回 400，不保存文件

#### Scenario: 超过大小限制
- **WHEN** 已登录用户上传一张大于 10MB 的图片
- **THEN** 返回 400，不保存文件

#### Scenario: 扩展名与内容不符
- **WHEN** 已登录用户上传一个扩展名为 `.png`、内容不是图片的文件
- **THEN** 返回 400，不保存文件

### Requirement: 文件命名与存储
上传的文件 SHALL 以随机文件名保存在按年月划分的目录下。存储实现 MUST 可以替换，而不影响业务代码。

#### Scenario: 同名文件互不覆盖
- **WHEN** 两个用户先后上传两个都叫 `logo.png` 的文件
- **THEN** 两个文件都被保存，各自有不同的 URL，先上传的仍然可以访问

### Requirement: 文件访问
`GET /files/**` SHALL 公开可读，并在响应里带 `X-Content-Type-Options: nosniff`。请求 MUST NOT 能读取存储目录之外的文件。

#### Scenario: 读取已上传的图片
- **WHEN** 未登录的客户端请求一个已上传图片的 URL
- **THEN** 返回 200 和图片内容

#### Scenario: 路径穿越
- **WHEN** 客户端请求带有 `../` 的路径，试图读取存储目录之外的文件
- **THEN** 返回 404
