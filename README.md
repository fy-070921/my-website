https://my-website-4r5.pages.dev

# 我的个人网站

FY 的个人网站——纯静态 HTML/CSS/JS，零费用、没有任何密钥、没有任何后端/Python 代码。网站本身零依赖（`serve` 只是本地预览的开发工具，不会部署上去），适配 Cloudflare Pages。

线上网址：课后部署完成后填在这里。

## 怎么在本地打开看效果

**方式一（最简单）：** 直接双击 `index.html`，浏览器打开就能看。

**方式二（推荐，和真实部署效果一致）：** 用 Node 的 `serve` 起本地静态服务器（不需要写任何后端代码）：

```bash
# 在项目目录 D:\桌面\my-website 下
npm install        # 第一次装一下本地预览工具（只需一次）
npm run preview    # 启动本地服务，端口 3000
```

然后浏览器打开 <http://localhost:3000>。想停服务，在命令行窗口按 `Ctrl + C`。

## 页面结构

| 文件 | 内容 |
| --- | --- |
| `index.html` | 首页：自我介绍、关于我、三件热爱的事（摄影/绘画/运动）、联系方式 |
| `works.html` | 作品页：摄影 / 绘画 / 运动 三个分区，各留 4 个空位框 |
| `css/style.css` | 全部样式（配色、排版、动画都在这里，改颜色改 `:root` 里的变量） |
| `js/main.js` | 导航状态、滚动淡入、关键词轮换、点击复制邮箱 |
| `package.json` | 本地预览用：`npm run preview` 起 serve 静态服务（开发工具，不参与部署） |

## 怎么放上自己的作品

1. 在项目里建三个文件夹并放图：

   ```
   assets/photos/   ← 摄影
   assets/art/      ← 绘画
   assets/sport/    ← 运动
   ```

2. 打开 `works.html`，找到某个「空位」，把整个格子：

   ```html
   <div class="frame reveal">
     <span class="plus">+</span>
     <small>PHOTO 01</small>
     <p class="hint">放一张你满意的照片</p>
   </div>
   ```

   换成：

   ```html
   <figure class="frame reveal">
     <img src="assets/photos/01.jpg" alt="一句话描述这张作品">
   </figure>
   ```

3. 刷新页面即可。图片建议宽 1200px 左右，jpg / png / webp 都行。

## 怎么改文字

- 名字、自我介绍、标语 → `index.html` 里搜「FY」「喜欢画画和代码」
- 邮箱 → `index.html` 里搜 `2910189879@qq.com`（两处：显示文字 + `data-copy="..."`，要一起改）
- GitHub 链接 → `index.html` 里搜 `github.com/fy-070921`（两处：显示文字 + `href`）
- 配色 / 字体 → `css/style.css` 最上面的 `:root` 变量

## 想免费上线（可选）：Cloudflare Pages

纯静态站，Cloudflare Pages 直接托管，不用改任何代码、不用密钥：

**方式一（拖拽上传，最快）：**

1. 登录 <https://dash.cloudflare.com> → **Workers & Pages** → **Create** → **Pages** → **Upload assets**
2. 把项目文件夹拖进去上传（`node_modules` 不用选）
3. 上传完就有网址 `https://xxx.pages.dev`

**方式二（连 GitHub 仓库，以后自动部署）：**

1. 把这个文件夹推到 GitHub 仓库（已有仓库更好）
2. Cloudflare 控制台 → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**，选中仓库
3. 构建设置这样填：
   - 构建命令（Build command）：**留空**
   - 输出目录（Build output directory）：**留空**（就是项目根目录）
4. 保存并部署，网址是 `https://xxx.pages.dev`，以后每次 push 自动更新，填到本文件顶部

> 说明：页面用的都是相对路径（`css/style.css`、`js/main.js`），部署到任何子路径都能正常显示；`package.json` 只是本地预览工具，不影响部署。

## 说明

- 网站里没有编造任何经历、奖项、作品：作品页全是空位框，首页「经历 · 奖项」一行也标了留空。
- 代码里没有任何密钥 / 令牌，可以放心公开仓库。
  
本次部署一开始选错入口，进到 Worker 插件流程，差点把项目建成 Worker。后来切换到 Cloudflare Pages，关联 GitHub 仓库，生产分支设为 main，框架选 None，构建命令留空，输出目录使用.。中途出现首次部署启动失败，核对配置后重新保存部署，最终成功上线。后续修改页面直接推送到 main 分支即可自动更新。
