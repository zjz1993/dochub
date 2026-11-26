# Spec Delta

## Purpose

面向读者的展示端：不用登录，按产品线、产品版本、语言浏览已经发布的内容。只暴露已上线版本的已发布内容；读者要的语言没有时，回退到默认语言并给出提示。

## ADDED Requirements

### Requirement: 无需登录
展示端的全部接口和页面 SHALL 对匿名读者开放，不要求登录态。

#### Scenario: 匿名访问展示端
- **WHEN** 未登录的客户端请求展示端的产品线列表
- **THEN** 返回 200

### Requirement: 只暴露已上线的内容
展示端的每个接口 SHALL 在查询前校验“产品线已启用且版本已上线”，不满足时返回 404。未发布的语言版本 MUST NOT 出现在任何展示端的响应里。

#### Scenario: 未上线的版本
- **WHEN** 读者请求一个未上线版本的目录树或文档
- **THEN** 返回 404

#### Scenario: 已下线的版本
- **WHEN** 系统管理员把某个版本下线之后，读者请求该版本的目录树
- **THEN** 返回 404

#### Scenario: 已停用的产品线
- **WHEN** 读者请求一个已停用产品线的版本列表
- **THEN** 返回 404

#### Scenario: 从未发布的文档
- **WHEN** 读者请求一篇从未发布过的文档
- **THEN** 返回 404

#### Scenario: 已下线的语言版本
- **WHEN** 某个文档的 en-US 语言版本被下线，读者以 en-US 请求这篇文档
- **THEN** 响应里不包含这个语言版本的内容

### Requirement: 产品线列表
`GET /api/portal/product-lines` SHALL 只返回已启用、并且至少有一个已上线版本的产品线，按排序值排列。

#### Scenario: 查询产品线
- **WHEN** 读者请求产品线列表，其中的产品线 C 没有任何已上线的版本
- **THEN** 结果包含产品线 A 和 B，不包含产品线 C

### Requirement: 版本列表与可用语言
`GET /api/portal/product-lines/{id}/versions` SHALL 返回该产品线已上线的版本，每个版本带上至少有一篇已发布文档的语言列表。

#### Scenario: 查询版本和语言
- **WHEN** 读者请求产品线 A 的版本列表
- **THEN** 返回 A 的已上线版本，其中版本 V 的可用语言是 `zh-CN` 和 `en-US`

#### Scenario: 只包含已上线的版本
- **WHEN** 产品线 A 有一个已上线的版本和一个未上线的版本
- **THEN** 结果里只有那个已上线的版本

### Requirement: 目录树
`GET /api/portal/product-versions/{id}/tree` SHALL 返回该版本的目录树：只包含至少有一个已发布语言版本的文档，没有任何可见文档的分类 MUST NOT 出现。分类的名称和文档的标题按请求的语言返回；该语言没有名称时，回退到产品线的默认语言。

#### Scenario: 按语言返回名称
- **WHEN** 读者以 `locale=en-US` 请求目录树
- **THEN** 有英文名称的分类和文档显示英文名称

#### Scenario: 名称缺失时回退
- **WHEN** 读者以 `locale=en-US` 请求目录树，某个分类只有中文名称
- **THEN** 这个分类显示中文名称，并被标记为回退

#### Scenario: 未发布的文档不出现
- **WHEN** 某篇文档的所有语言版本都没有发布
- **THEN** 目录树里没有这篇文档

#### Scenario: 空分类不出现
- **WHEN** 某个分类及其全部子分类下都没有已发布的文档
- **THEN** 目录树里没有这个分类

#### Scenario: 只有默认语言已发布
- **WHEN** 某篇文档只有 zh-CN 已发布，读者以 en-US 请求目录树
- **THEN** 这篇文档出现在目录树里，标题是中文标题

### Requirement: 文档内容与语言回退
`GET /api/portal/product-versions/{id}/documents/{docId}` SHALL 按下面的顺序返回内容：请求语言的已发布内容；没有，则产品线默认语言的已发布内容，并标记为回退；再没有，则任意一种已发布的语言，并标记为回退；一种都没有，则返回 404。响应里 SHALL 带上实际返回的语言和读者请求的语言。

#### Scenario: 所需的语言已发布
- **WHEN** 读者以 `locale=en-US` 请求一篇有已发布英文版的文档
- **THEN** 返回英文的标题和正文，`locale` 为 `en-US`，`fallback` 为 false

#### Scenario: 所需的语言没有翻译
- **WHEN** 读者以 `locale=en-US` 请求一篇只有已发布中文版的文档，产品线的默认语言是 zh-CN
- **THEN** 返回中文的标题和正文，`locale` 为 `zh-CN`，`fallback` 为 true，`requestedLocale` 为 `en-US`

#### Scenario: 所需的语言写了但没有发布
- **WHEN** 读者以 `locale=en-US` 请求一篇英文版只有草稿、中文版已发布的文档
- **THEN** 返回中文的内容并标记为回退，响应里没有任何英文草稿的内容

#### Scenario: 默认语言也没有发布
- **WHEN** 读者以 `locale=ja-JP` 请求一篇只有 en-US 已发布、默认语言 zh-CN 未发布的文档
- **THEN** 返回 en-US 的内容，并标记为回退

#### Scenario: 没有任何已发布的语言
- **WHEN** 读者请求一篇所有语言版本都未发布的文档
- **THEN** 返回 404

### Requirement: 页面导航与地址
展示端 SHALL 由服务端渲染，并提供产品线、版本、语言三个切换入口。文档的地址形如 `/{产品线code}/v{版本id}/{docKey}?locale=`，切换语言和版本之后地址 SHALL 同步变化。

#### Scenario: 切换语言
- **WHEN** 读者在文档页把语言从 zh-CN 切到 en-US
- **THEN** 页面以 en-US 重新加载，地址里的 `locale` 变为 `en-US`

#### Scenario: 切换版本后停在同一个文档
- **WHEN** 读者在版本 2.0.0 阅读某篇文档，然后切换到 3.0.0，两个版本里都有这篇文档
- **THEN** 页面显示 3.0.0 里的同一篇文档

#### Scenario: 目标版本没有这篇文档
- **WHEN** 读者切换到一个没有当前这篇文档的版本
- **THEN** 页面回到该版本的目录导航，并给出提示

#### Scenario: 回退提示
- **WHEN** 读者看到的文档内容来自语言回退
- **THEN** 页面顶部提示“本文暂无该语言版本，以下为默认语言内容”

### Requirement: 展示端响应只含读者所需的字段
展示端的文档接口 SHALL 只返回标题、净化后的正文、实际的语言、请求的语言、是否回退和更新时间，不返回草稿、修订的指针、锁等内部状态。

#### Scenario: 检查响应的字段
- **WHEN** 读者请求一篇文档
- **THEN** 响应的数据只有 `documentId`、`docKey`、`locale`、`requestedLocale`、`fallback`、`title`、`html`、`updatedAt`
