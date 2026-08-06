---
title: "AstroとCloudflare Pagesで個人ブログを作った流れ"
description: "SEでありゲーマーでもある筆者が、AstroとCloudflare Pagesを使って趣味の個人ブログを公開するまでの流れをまとめました。"
pubDate: 2026-07-29
heroImage: '../../assets/blog-placeholder-1.jpg'
category: "Dev"
tags: ["Astro", "Cloudflare Pages", "GitHub", "ブログ運営"]
author: "taha"
draft: false
---

## はじめに

普段はSEとしてWebシステムの開発に関わり、趣味ではゲームをよく遊んでいます。

仕事や個人制作で試した技術、遊んだゲーム、気になったAIの活用法などを、自分用の記録も兼ねて残せる場所がほしくて、個人ブログを作りました。

ブログをいきなり大きく運営するというより、まずは趣味の一つとして、楽しみながら続けてみたいと考えています。

せっかくなら記事を書くだけではなく、サイト自体も自分で作ってみたい。とはいえ、サーバーの管理や毎月の維持費はできるだけ抑えたい。

そこで今回は、AstroとCloudflare Pagesを使って、Markdownで更新できるブログを作りました。

この構成にした理由は、記事を普通のテキストファイルとして管理できて、サーバーの管理もほとんど必要ないからです。Cloudflare PagesのFreeプランを使えば、ブログを始める段階の費用も抑えられます。

SEとして働いていますが、AstroやCloudflare Pagesに最初から詳しかったわけではありません。そこで、分からない部分はAIに相談し、必要な設定や次に進める作業を一つずつ確認しながら形にしていきました。

この記事では、独自ドメインを準備してからブログを公開するまでに進めたことを、順番にまとめます。

![Astroで個人ブログを構築するイメージ](../../assets/blog-placeholder-2.jpg)

*テンプレートから始め、必要な機能を少しずつ追加して現在の形へ整えていった。*

## まずは全体の流れ

今回やったことを先にまとめると、次のような流れです。

1. 独自ドメインを取得する
2. AstroのBlogテンプレートでサイトを作る
3. GitHubにソースコードを置く
4. Cloudflare PagesとGitHubを連携する
5. 独自ドメインをPagesへ設定する
6. sitemapとrobots.txtを用意する
7. Markdownで記事を書けるようにする

記事を追加するときは、Markdownファイルを書いてGitHubへpushするだけです。push後はCloudflare Pagesが自動でビルドと公開を行ってくれます。

## 1. 独自ドメインを準備する

> この作業の目的：ブログ専用の「住所」を用意し、覚えてもらいやすいURLで公開するためです。

まずはドメイン取得サービスで、ブログに使う独自ドメインを取得しました。

取得後はCloudflareへドメインを追加し、指定されたネームサーバーへ変更します。Cloudflare側のステータスが「Active」になれば、ドメインの準備は完了です。

今回取得したドメインは、キャンペーンの適用で初年度が無料でした。2年目以降は、年間3,500円ほどかかる予定です。更新料金はサービスや時期によって変わるため、契約時に確認しておくと安心です。

サイトの公開にはCloudflareのFreeプランを使っています。個人ブログを始める段階では、まず無料の範囲で十分だと考えました。

## 2. AstroのBlogテンプレートを使う

> この作業の目的：ブログに必要な基本構成を利用して、サイトを早く形にするためです。

サイトはAstroの公式Blogテンプレートをベースにしました。

Astroには最初からブログ向けの構成が用意されているので、完全にゼロから作るよりも始めやすいです。

```powershell
npm create astro@latest -- --template blog
```

プロジェクトを作成したら、必要なパッケージをインストールして開発サーバーを起動します。

```powershell
cd <プロジェクトフォルダー>
npm install
npm run dev
```

通常は次のURLからローカルのサイトを確認できます。

```text
http://localhost:4321/
```

ファイルを保存するとブラウザ側も自動で更新されるので、見た目を確認しながら作業できます。

## 3. GitHubへソースコードを置く

> この作業の目的：サイトの変更履歴を残し、Cloudflare Pagesから読み込める状態にするためです。

次にGitHubで新しいリポジトリを作り、Astroプロジェクトをpushしました。

```powershell
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<ユーザー名>/<リポジトリ名>.git
git push -u origin main
```

ここから先は、基本的に次の流れで更新していきます。

```powershell
npm run build
git add .
git commit -m "変更内容"
git push
```

先に`npm run build`を実行しておくと、公開前に本番用のページが正常に生成できるか確認できます。

![GitHubから公開環境へ反映するイメージ](../../assets/blog-placeholder-3.jpg)

*記事やサイトの変更をGitHubへ送り、Cloudflare Pagesが自動で公開用ページを生成する。*

## 4. Cloudflare PagesとGitHubをつなぐ

> この作業の目的：GitHubへ変更を送るだけで、サイトを自動的に更新できるようにするためです。

Cloudflareの「Workers & Pages」からPagesプロジェクトを作り、「Connect to Git」でGitHubのリポジトリを選びました。

ビルド設定は次のようにしています。

| 設定 | 入力内容 |
|---|---|
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `dist` |

この設定でデプロイすると、GitHubの`main`ブランチへpushするたびにCloudflare Pagesがサイトを更新してくれます。

Cloudflareの公式手順にも、Astro向けの設定例が掲載されています。

[Cloudflare PagesでAstroを公開する手順](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)

## 5. 独自ドメインをPagesへ設定する

> この作業の目的：Cloudflare Pagesで公開したサイトを、自分で取得したドメインから表示するためです。

Cloudflare Pagesのプロジェクト設定から、最初に準備した独自ドメインを追加します。

ドメインとPagesが同じCloudflareアカウント内にあれば、DNSレコードも比較的簡単に設定できます。

設定後は、次のように独自ドメインでサイトを開けることを確認しました。

```text
https://example.com/
```

ここで使っている`example.com`の部分は、自分が取得したドメインへ置き換えます。

## 6. sitemap.xmlとrobots.txtを用意する

> この作業の目的：検索エンジンにサイトの存在とページ構成を伝え、記事を見つけてもらいやすくするためです。

検索エンジンからサイトを見つけてもらいやすくするため、サイトマップと`robots.txt`も用意しました。

確認するURLは次の2つです。

```text
https://example.com/sitemap.xml
https://example.com/robots.txt
```

`robots.txt`には、サイトマップの場所を書いておきます。

```text
User-agent: *
Allow: /

Sitemap: https://example.com/sitemap.xml
```

設定後は、どちらのURLもブラウザから表示できることを確認しました。サイトマップの詳しい生成方法や設定内容は、別の記事でまとめる予定です。

## 7. Markdownで記事を管理する

> この作業の目的：HTMLを毎回書かなくても、文章と基本情報だけで記事を追加できるようにするためです。

記事は`src/content/blog/`フォルダーへ保存する形にしました。

```text
src/
├─ content/
│  └─ blog/
│     └─ first-post.md
└─ content.config.ts
```

現在の記事は、基本的にMarkdownで書いています。今後、記事の中でAstroコンポーネントを使いたくなった場合は、MDXの導入も検討できます。

[AstroでMDXを使う方法](https://docs.astro.build/en/guides/integrations-guide/mdx/)

記事ファイルの先頭には、タイトルや公開日などを書きます。

```md
---
title: "最初の記事"
description: "この記事の内容を短くまとめた説明文です。"
pubDate: 2026-07-29
category: "Dev"
tags: ["Astro", "ブログ運営"]
author: "taha"
draft: false
---

## はじめに

ここから本文を書きます。
```

`draft`を`true`にすると、書きかけの記事として管理できます。

```yaml
draft: true
```

## 記事を公開するときの流れ

サイト完成後は、次の手順だけで記事を追加できます。

1. `src/content/blog/`へMarkdownファイルを追加して、記事の本文と基本情報を書く
2. `npm run dev`を実行して、ブラウザで見た目や内容を確認する
3. `npm run build`を実行して、公開用のページを正常に生成できるか確認する
4. GitHubへcommit・pushして、変更履歴を保存しながら公開処理を開始する
5. Cloudflare Pagesの自動デプロイが終わったら、公開ページを確認する

```powershell
npm run build
git add .
git commit -m "Add new article"
git push
```

![taha.logを更新していくイメージ](../../assets/blog-placeholder-4.jpg)

*完成形を一度で目指さず、記事やデザインを少しずつ改善していく。*

## まとめ

今回の構成なら、記事はMarkdownファイルとして手元に残り、GitHubで変更履歴も管理できます。

Cloudflare PagesとGitHubを連携しているので、記事をpushすれば公開まで自動です。サーバーを自分で管理する必要もありません。

現在かかっている主な費用は独自ドメイン代で、初年度は無料、2年目以降は年間3,500円ほどの予定です。まずは大きな維持費をかけずに始められました。

サイト作成ではAIをかなり活用しました。構成や設定、コードのたたき台を作ってもらい、分からない部分を一つずつ確認することで、思っていたよりも簡単に公開まで進められました。

ただし、提案された内容をそのまま使うのではなく、`npm run dev`で表示を確認し、`npm run build`が通ることを自分で確かめながら進めています。この確認さえ行えば、AIは個人サイト作りのハードルをかなり下げてくれると感じました。

これからはゲームやAI、Web開発で実際に試したことを、あとから自分でも再現できる形で残していく予定です。

まずは公開できる最小構成まで作り、そこから記事とデザインを少しずつ増やしていく。この進め方なら、個人ブログでも無理なく続けられそうです。
