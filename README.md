# AI See

一个基于纯静态文件的 AI 可视化网页展示站，适合把多个单 HTML 小项目统一挂到 GitHub Pages。

## 当前结构

```text
AI_see/
├─ index.html
├─ assets/
│  ├─ site.css
│  └─ site.js
├─ data/
│  └─ projects.js
├─ pages/
│  ├─ cyber-turing/
│  │  └─ index.html
│  └─ hnu-turing/
│     └─ index.html
└─ .nojekyll
```

## 本地查看

直接打开根目录下的 `index.html` 即可。

如果想避免浏览器对本地 iframe 的限制，也可以在项目目录启动一个静态服务，例如：

```powershell
python -m http.server 8000
```

然后访问 `http://localhost:8000/`。

## 发布到 GitHub Pages

根据 GitHub Docs，静态站点可以直接从仓库分支发布，入口文件放在发布目录顶层即可。

1. 把当前代码推送到 GitHub 仓库。
2. 打开仓库的 `Settings`。
3. 进入 `Pages`。
4. 在 `Build and deployment` 的 `Source` 里选择 `Deploy from a branch`。
5. 分支选择 `main`，目录选择 `/(root)`。
6. 保存后等待几分钟，站点通常会发布到：

```text
https://wyqdf.github.io/AI_see/
```

## 以后怎么继续加页面

1. 新建目录：`pages/your-page/index.html`
2. 打开 `data/projects.js`
3. 按现有格式新增一个项目对象
4. 提交并推送到 GitHub

首页会自动生成新的导航卡片。

## 说明

- 当前站点不依赖构建工具。
- 已加入 `.nojekyll`，避免 GitHub Pages 对静态文件做不必要处理。
- 两个现有页面都增加了返回首页入口，便于在展示站内来回跳转。
