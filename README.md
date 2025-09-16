[ 各概要 ]

|- index.html
世界地図にポートのシンボルを出す本体
各種のポートデータは、Cloudflare Workers で管理されています。
Cloudflare では下記でドメイン構築済
https://port-data.veltra.work/port.json
直接アクセスしても簡易的にマスタファイルを閲覧できないように処理済
|- vt_area.json  
 VELTRA エリアトップの URL マスタファイル
|- images
　　アイコンなどの画像データ

# 🗺️ VELTRA PortMap

このプロジェクトは、VELTRA に関連する世界中の港（ポート）情報を地図上に可視化する静的 Web サイトです。  
データは Cloudflare Workers + KV によって安全に配信され、GitHub Pages 経由で表示されます。

---

## 📁 ディレクトリ構成と役割

```
portmap/
├── index.html               # メインの地図描画ページ（Mapbox使用）
├── vt_area.json             # VELTRAエリアマスタファイル
├── images/                  # マーカーアイコンなどの画像（VT_symbolなど）
├── src/index.js             # Cloudflare Workers エントリーポイント（CORS, Referer制御含む）
├── wrangler.jsonc           # Workers設定ファイル（KVやルート情報など）
├── .git/                    # Gitリポジトリ管理フォルダ
├── .gitignore               # Git追跡除外設定（node_modulesなど）
├── node_modules/            # npm依存（ローカル開発用）
├── package.json             # npmスクリプト・依存関係（lite-server等）
├── .vscode/                 # 開発用エディタ設定（任意）
└── .DS_Store など           # 自動生成ファイル（.gitignoreで除外）
```

---

## 🌍 公開 URL（GitHub Pages）

https://veltra-maps.github.io/portmap/

---

## 🔐 データ提供 API（Cloudflare Workers）

```
Cloudflare Workers + KV にて `port.json` などのマスタ情報を配信中：
https://portmap.veltra.work/port.json?default=load
```

- Referer 制御で以下のみアクセス許可：
  - `https://veltra-maps.github.io`
  - `http://localhost:1010`
  - `http://127.0.0.1:1010`
  - `http://localhost:8000`
  - `http://localhost:3000`

---

## ⚙️ ローカル開発手順

```bash
cd ~/ProjectsDesktop/portmap

# ローカルサーバー起動
npx lite-server

# ブラウザで確認
http://localhost:3000/
```

- `index.html` と `vt_area.json` が読み込まれ、Cloudflare 上の `port.json` を fetch
- マーカーが表示されれば全構成が正常
- サーバーを終了させるときは Ctrl + C を押す

---

## ☁️ Cloudflare デプロイ手順

Cloudflare Workers と KV ストレージを使用して `port.json` を安全に配信しています。  
デプロイには Node.js v20 以上が必要です（`nvm` を利用）。

```bash
# Node.js v20 に切り替え（初回1回だけで以降は不要）
nvm install 20
nvm use 20
nvm alias default 20  # 任意：常にv20を使う

# Cloudflare アカウントにログイン（初回のみ自動で以降は不要）
npx wrangler deploy
```

---

## 📝 .gitignore 内容（不要ファイルを Git 管理から除外）

```
node_modules/
.DS_Store
package-lock.json
package.json
.env
.wrangler/
```

---

## 📤 GitHub 初回 push 手順（参考）

```bash
cd ~/ProjectsDesktop/portmap
git init
git remote add origin https://github.com/veltra-maps/portmap.git
上記はすでに実行済みの場合、対応不要

git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
```

---

## ✅ 現在の構成は以下の通り整備済み

- [x] Git リポジトリ構成（push/pull/ignore）整備済
- [x] GitHub Pages で公開済
- [x] Cloudflare Workers で API 提供
- [x] Referer & CORS 制御対応済
- [x] ローカルサーバー確認環境（lite-server）

---

## 📤 GitHub アップロード手順（各プロジェクト）

各プロジェクトフォルダ（例: `portmap/`, `cruise-itinerary/`）ごとに、GitHub リポジトリと接続してアップロード（push）できます。

### ✅ 初回セットアップ

```bash
cd ~/ProjectsDesktop/portmap

# Git初期化（初回のみ、以降不要）
git init

# GitHubのリモートリポジトリを登録（初回のみ、以降不要）
git remote add origin https://github.com/veltra-maps/portmap.git

# ブランチ名を main に統一
git branch -M main

# ファイルをステージング
git add .

# コミット
git commit -m "Initial commit"

# GitHubに初回push
git push -u origin main
```

### ✅ 既に初期化済のプロジェクトで更新を push する場合

```bash
cd ~/ProjectsDesktop/<プロジェクト名>

# ファイル追加・変更後（まとめて差分全部アップ）
git add .
git commit -m "Update project files"
git push origin main
```

# ファイル追加・変更後 （個別でアップする場合 例：README.md）

git add README.md
git commit -m "Update README with latest project setup"
git push origin main

---
