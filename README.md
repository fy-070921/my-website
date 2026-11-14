# 我的个人网站

FY 的个人网站——纯静态 HTML/CSS/JS，零依赖、零费用、没有任何密钥。

线上网址：课后部署完成后填在这里。

## 怎么在本地打开看效果

**方式一（最简单）：** 直接双击 `index.html`，浏览器打开就能看。

**方式二（推荐，和真实部署效果一致）：** 在项目文件夹下开一个本地小服务器：

```bash
# Windows（在项目目录 D:\桌面\my-website 下）
py -m http.server 8000
# 或者
python -m http.server 8000
```

然后浏览器打开 <http://localhost:8000>。

## 页面结构

| 文件 | 内容 |
| --- | --- |
| `index.html` | 首页：自我介绍、关于我、三件热爱的事（摄影/绘画/运动）、联系方式 |
| `works.html` | 作品页：摄影 / 绘画 / 运动 三个分区，各留 4 个空位框 |
| `css/style.css` | 全部样式（配色、排版、动画都在这里，改颜色改 `:root` 里的变量） |
| `js/main.js` | 导航状态、滚动淡入、关键词轮换、点击复制邮箱 |

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

## 想免费上线（可选）

GitHub Pages，免费、不用密钥：

1. 把这个文件夹推到 GitHub 仓库（已有仓库更好）
2. 仓库的 **Settings → Pages → Source** 选 `main` 分支、`/ (root)`
3. 等一两分钟，网址就是 `https://fy-070921.github.io/仓库名/`，填到本文件顶部

## 说明

- 网站里没有编造任何经历、奖项、作品：作品页全是空位框，首页「经历 · 奖项」一行也标了留空。
- 代码里没有任何密钥 / 令牌，可以放心公开仓库。
