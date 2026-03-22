# api-election

<!-- ABOUT THE PROJECT -->

## About The Project

此專案為選舉開票 RESTful API 服務，提供縣市與鄉鎮投票統計資料的查詢介面，並包含管理員寫入票數的端點。以 Node.js（TypeScript）搭配 Express 框架開發，使用 MongoDB 作為資料儲存，並整合 OpenAPI 規格文件。部署採用 Docker 容器化，透過 GitHub Actions CI/CD 自動建置並推送至 AWS ECR，再由 Auto Scaling Group 滾動更新上線。

## Demo

縣市長選舉開票地圖：https://fionasgithub.github.io/react-tw-elections-dashboard/

## Tech Stack

- Node.js (TypeScript)
- Express
- MongoDB / Mongoose
- Zod
- Redocly (OpenAPI)
- Docker
- GitHub Action
- AWS (ECR + EC2 + ASG)

## Getting Started

1. 安裝依賴套件
   ```shell
   npm install
   ```
2. 建立環境變數檔案
   ```shell
   cp .env.example .env
   ```
3. 啟動開發伺服器
   ```shell
   npm run dev
   ```

> 若需完整的本地 Docker 環境（含 Nginx、MongoDB、Valkey），請參考 [app-local-docker](https://github.com/DivaDebug/app-local-docker)

## OpenAPI Documentation

### 本地預覽（互動式 Redoc UI）

```shell
npm run docs:dev
```

啟動後開啟瀏覽器前往：
- http://api.election.localhost:8080 (for docker)
- http://localhost:8080

### 建置靜態 HTML 文件

```shell
npm run docs:build
```

- 產出檔案位於 `public/api-doc.html`
- 本地：http://api.election.localhost/api-doc.html
- 線上（for demo）：https://api-election.divadebug.com/api-doc.html

## Deployment

推送至 `main` 分支後，GitHub Actions 會自動執行：

1. 安裝依賴、編譯 TypeScript
2. 建置 OpenAPI 靜態文件
3. 建置 Docker 映像並推送至 AWS ECR
4. 更新 EC2 Launch Template，觸發 Auto Scaling Group 滾動更新
