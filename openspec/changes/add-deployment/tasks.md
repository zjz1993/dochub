# Tasks

> 规格在 `specs/`，技术方案在 [design.md](./design.md)，本周的学习目标、知识点和资料见 [week-10.md](../../../docs/learning/week-10.md)。
> 耗时是你投入的时间；“你写 / 你设计 / AI 写 / 你操作”的约定见 [development-guide](../../../docs/development-guide.md)。

## 1. 镜像与编排

- [ ] 1.1 **镜像与生产编排**（2.5h｜AI 写，你跑｜前置：任务 3.1（`add-public-portal`））：后端的多阶段构建镜像（构建用 Maven 加 JDK 21，运行用 JRE 21，非 root 用户）；Next.js 的 standalone 镜像；`deploy/compose.prod.yml`（MySQL、Redis、后端、frontend；只有 frontend 发布到 `127.0.0.1:3100`；每个服务设内存上限；数据卷；健康检查；调小 JVM 和 MySQL 的内存参数）。后端补三处：首次启动按环境变量创建系统管理员、生产环境关闭接口文档、Cookie 在生产环境加 `Secure`。 验证：在本机用 `deploy/compose.prod.yml` 完整跑起来；`docker stats` 下四个容器内存合计不超过 1.2GB；镜像里没有源码和构建缓存。
  - 内存参数参考：后端 `-Xmx256m -XX:MaxMetaspaceSize=96m -XX:+UseSerialGC`；MySQL `innodb_buffer_pool_size=128M`、`performance_schema=OFF`；Next.js `--max-old-space-size=192`。

## 2. 服务器

- [ ] 2.1 **服务器预检与清理**（1.5h｜你操作，命令先经确认｜前置：无，可提前）：清理未使用的镜像和构建缓存，目标是磁盘可用不少于 15GB；停掉确认不用的容器或服务，目标是可用内存不少于 1.8GB；在 DNSPod 给子域名加 A 记录；在宝塔新建反向代理站点并签发证书；确认安全组放行 80 和 443。 验证：`free -h` 的 available 不少于 1.8GB；`df -h /` 的可用不少于 15GB；域名解析到服务器；HTTPS 能访问。
  - 注意：要删的镜像清单先列出来确认；拿不准是否在用的容器不要动。清理会释放多少内存、停掉哪些服务，由你决定，现状见 `docs/development-guide.md`。主域名备案为个人非经营性网站，子域名放作品演示是否符合备案要求，请你判断。
- [ ] 2.2 **部署与反向代理**（3h｜你操作｜前置：任务 1.1、任务 2.1）：在 Mac 上构建 linux/amd64 镜像，用 `docker save` 经 ssh 传到服务器再 `docker load`；服务器上 `docker compose -p dochub up -d`；宝塔的 nginx 把 `/api/`、`/files/` 转给后端，其余转给 `127.0.0.1:3100`；首次启动自动跑迁移并创建管理员。 验证：`https://dochub.zhaojunzhe.site` 可访问；“登录 → 编辑 → 发布 → 展示端可见”整条链路通过；服务器上原有的站点不受影响。 测试：按任务 3.1 的冒烟清单走一遍

## 3. 运维与总结

- [ ] 3.1 **备份、冒烟清单与项目说明**（1.5h｜AI 写脚本与初稿，你执行｜前置：任务 2.2）：MySQL 定时备份脚本（保留 7 份）和文件目录备份，用独立脚本加 crontab，不放进宝塔面板；README 写部署、升级、回滚步骤；冒烟清单。 验证：手动触发一次备份，并在本机恢复成功；照着 README 能完成一次重新部署。
- [ ] 3.2 **项目总结**（1.5h｜你写｜前置：任务 3.1）：整理架构图、关键决策（ADR 已有），以及你独立解决过的难题。对每个模块能脱稿讲清“为什么这样设计，换一种做法会怎样”。 验证：不看笔记讲清 5 个核心设计：鉴权、发布与修订、复制版本、编辑锁、展示端回退。
