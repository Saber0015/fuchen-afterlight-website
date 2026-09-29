# 富晨 · Afterlight 网站备份

完整网站保存在本仓库的 **Releases 附件**中，仓库为私有。

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
