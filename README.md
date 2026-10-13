# 富晨 · Afterlight 网站备份

完整网站保存在本仓库的 **Releases 附件**中，仓库目前为公开。

## 在线网站

**[访问富晨 · Afterlight 网站](https://saber0015.github.io/fuchen-afterlight-website/)**

GitHub Pages 由 `.github/workflows/pages.yml` 自动发布。每次更新 `main` 或手动运行工作流时，下载下方固定版本的完整备份，校验压缩包和 116 个网站文件的 SHA-256，再将 `public/` 的 18 个静态页面发布到 Pages。

`scripts/prepare-pages.mjs` 将页面、图片和脚本链接适配到 `/fuchen-afterlight-website/` 项目路径，保留四语切换、产品详情及询价草稿功能。原始素材、研究与测试记录保留在备份中；发布内容来自 `public/`。

GitHub 仓库 **Settings → Pages → Source** 使用 **GitHub Actions**。查看发布状态：[Actions](https://github.com/Saber0015/fuchen-afterlight-website/actions/workflows/pages.yml)。

后续更换网站版本时，更新工作流中的 `BACKUP_URL` 和 `BACKUP_SHA256`。如页面数量发生变化，同时更新准备脚本中的页面数量校验。

**[下载完整网站备份（约 38 MB）](https://github.com/Saber0015/fuchen-afterlight-website/releases/download/backup-2026-09-29/fuchen-afterlight-full-backup-20260929.zip)**  
[查看备份版本和校验文件](https://github.com/Saber0015/fuchen-afterlight-website/releases/tag/backup-2026-09-29)

请下载名为 `fuchen-afterlight-full-backup-20260929.zip` 的附件。GitHub 自动提供的 `Source code` 下载及仓库克隆只包含仓库文件，不包含 Release 附件。

## 备份内容

- 日期：2026-09-29。
- 495 个文件：18 个页面、四语内容、样式与脚本、本地图片和字体、原始素材、构建脚本及测试记录。
- 额外附有 `FILE-MANIFEST.json`，记录全部 495 个文件的大小与 SHA-256。
- 旧压缩包、缓存和历史压缩快照未重复纳入。
- 已核对归档内全部文件；GitHub 显示的压缩包 SHA-256 与本机一致。

## 恢复

1. 下载上述完整备份附件并解压。
2. 进入 `fuchen-afterlight` 文件夹。
3. 使用 Node.js 18 或更新版本运行：

```sh
node scripts/serve.mjs
```

打开 http://127.0.0.1:4327/ 。无需安装第三方包。完整说明见解压后的 `README.md`；网站静态文件位于 `public/`；本次测试报告位于 `qa/full-site-audit/REPORT.md`。

## 校验值

```text
b14e17bc4f5536865315f31bf7480e98a0d695364cdf1fcc94208f8965dc3015  fuchen-afterlight-full-backup-20260929.zip
```
