# taha.log() Astro ブログ機能

`tahalog.com` の既存Astroプロジェクトへ追加するための、Markdown / MDX対応ブログ一式です。

実装内容:

- Astro Content Collectionsによる記事管理
- `/blog/` の記事一覧
- `/blog/記事ID/` の記事詳細
- Games / AI / Dev / Gadgets のカテゴリーページ
- タグページ
- 下書き除外と公開日の新しい順での並び替え
- canonical、description、Open Graph、Twitter Card
- BlogPosting構造化データ（JSON-LD）
- 既存の `/sitemap.xml` と `robots.txt` を維持する構成

## 対応バージョン

この配布物は Astro 7.1.4 でビルド確認しています。`render()` とContent Layer APIを使うため、Astro 5以降を前提にしています。

## 既存プロジェクトへの追加

まず、既存の `tahalog` リポジトリで作業用ブランチを作ります。

```bash
git switch -c feature/blog
```

この配布物から次の場所を既存プロジェクトへコピーします。

```text
src/content.config.ts
src/content/blog/
src/lib/
src/components/
src/layouts/
src/pages/blog/
src/pages/category/
src/pages/tag/
src/styles/
```

同名のレイアウトやCSSがすでにある場合は、既存デザイン側へ内容を移してください。特に `BaseLayout.astro` と `global.css` は、丸ごと上書きせず、SEO用の `<SeoHead />` と必要なスタイルだけ統合するのが安全です。

MDXの依存関係を追加します。

```bash
npx astro add mdx
```

`astro.config.mjs` は、この配布物を参考に既存設定へマージしてください。重要なのは次の3点です。

```js
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://tahalog.com',
  output: 'static',
  integrations: [mdx()],
});
```

すでにあるCloudflare設定、サイトマップ設定、他のintegrationは削除しません。既存の `integrations` 配列へ `mdx()` だけを重複しないように追加します。

## 記事の追加

`src/content/blog/` に `.md` または `.mdx` を追加します。ファイル名が記事URLになります。

```text
src/content/blog/astro-cloudflare.md
→ https://tahalog.com/blog/astro-cloudflare/
```

Markdown記事のひな形:

```md
---
title: "記事タイトル"
description: "検索結果に表示する、記事内容が分かる説明文。"
pubDate: 2026-07-29
updatedDate: 2026-08-01
category: "Dev"
tags: ["Astro", "Cloudflare"]
author: "taha"
draft: false
ogImage: "/images/posts/astro-cloudflare/og.jpg"
---

## 見出し

本文を書きます。
```

メタデータ:

| 項目 | 必須 | 内容 |
|---|---:|---|
| `title` | 必須 | 1〜70文字 |
| `description` | 必須 | 1〜160文字。検索結果やSNS共有に使用 |
| `pubDate` | 必須 | 公開日 |
| `updatedDate` | 任意 | 内容を更新した日 |
| `category` | 必須 | `Games` / `AI` / `Dev` / `Gadgets` |
| `tags` | 任意 | 複数指定可能 |
| `author` | 任意 | 省略時は `taha` |
| `draft` | 任意 | `true` は本番ビルドから除外 |
| `ogImage` | 任意 | `public` からの絶対パス。推奨1200×630px |

通常の記事はMarkdownにし、記事本文の中でAstroコンポーネントを使う場合だけMDXにすると運用が簡単です。

## 動作確認

```bash
npm run dev
```

ブラウザで次を確認します。

```text
http://localhost:4321/blog/
http://localhost:4321/blog/first-post/
http://localhost:4321/category/Dev/
http://localhost:4321/tag/Astro/
```

本番相当の確認:

```bash
npm run build
```

ビルド後、次を確認します。

- `dist/blog/first-post/index.html` がある
- HTMLの `<head>` にcanonical、description、OGP、JSON-LDがある
- 既存の `/sitemap.xml` 内に `/blog/first-post/` がある
- 既存の `robots.txt` がサイトマップの正しいURLを指している

現在表示できている `/sitemap.xml` と `robots.txt` は上書きしません。サイトマップが静的ファイルの場合は記事URLが自動追加されないため、記事追加時にURLも追記します。すでにコードでページ一覧から生成している場合は、新しい静的ルートが含まれることだけ確認してください。

## 公開

確認後にコミットしてGitHubへpushします。

```bash
git add .
git commit -m "Add Astro blog with Markdown and MDX"
git push -u origin feature/blog
```

Cloudflare PagesがGit連携済みなら、対象ブランチまたはmainへの反映後に `npm run build`、出力先 `dist` で再デプロイされます。

公開後は次を確認してください。

```text
https://tahalog.com/blog/
https://tahalog.com/blog/first-post/
https://tahalog.com/sitemap.xml
https://tahalog.com/robots.txt
```
