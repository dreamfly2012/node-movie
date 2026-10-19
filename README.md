# node-movie

基于 Node.js + Express 的轻量级电影文章管理系统，支持文章发布与编辑、用户管理、实时聊天、后台管理等功能。

## 技术栈

| 技术 | 用途 |
|------|------|
| Express 4 | Web 框架 |
| EJS | 模板引擎（`.html` 视图） |
| MySQL | 数据库 |
| Socket.IO | 实时聊天 |
| UEditor | 富文本编辑器 |
| Semantic UI | 前端 UI 框架 |
| Highcharts | 图表展示 |

## 项目结构

```
node-movie/
├── bin/www              # 启动入口（HTTP + Socket.IO）
├── app.js               # Express 应用配置与路由挂载
├── conf/conf.js         # 数据库连接配置
├── routes/              # 路由模块
│   ├── index.js         # 首页
│   ├── post.js          # 文章查看 / 编辑
│   ├── user.js          # 用户列表 / 编辑
│   ├── category.js      # 分类管理
│   ├── login.js         # 登录 / 登出
│   ├── admin.js         # 后台管理
│   ├── chat.js          # 聊天页面
│   ├── highcharts.js    # 图表页面
│   └── about.js         # 关于页
├── model/               # 数据模型（MySQL CRUD）
│   ├── post.js
│   ├── user.js
│   └── category.js
├── views/               # EJS 视图（.html）
├── public/              # 静态资源（CSS / JS / 图片 / UEditor）
├── semantic/            # Semantic UI 主题
├── nodeweb.sql          # 数据库初始化脚本（建库、建表、初始数据）
└── package.json
```

## 快速开始

### 1. 初始化数据库

确保本地 MySQL 服务已启动，然后导入初始化脚本：

```bash
mysql -u root -p < nodeweb.sql
```

```powershell
Get-Content nodeweb.sql | mysql -u root -p
```

> `nodeweb.sql` 为完整导出文件（`--databases` 含建库语句），一次性创建 `nodeweb`
> 数据库及 `post`、`user`、`category` 三张表，并插入全部数据：
> - `user`：默认账号 `admin / 123456`
> - `category`：经典 / 科幻 / 爱情 三个分类
> - `post`：含 5 篇经典电影的图文影评（海报图放在 `public/images/`）

### 2. 配置数据库连接

编辑 `conf/conf.js`，将数据库账号改为你的本地配置：

```js
module.exports = {
  mysql: {
    host: '127.0.0.1',
    user: 'root',
    password: 'root',   // ← 改为你的 MySQL 密码
    database: 'nodeweb',
    port: 3306
  }
};
```

### 3. 安装依赖

```bash
npm install
```

### 4. 启动服务

```bash
npm start
```

服务将在 **40000** 端口启动，访问 `http://localhost:40000`。

## 主要路由

| 路径 | 方法 | 说明 |
|------|------|------|
| `/` | GET | 首页（电影文章列表） |
| `/articles/` | GET | 文章列表 |
| `/article/:id` | GET | 文章详情 |
| `/add/` | GET | 后台：添加文章页 |
| `/post/add_do/` | POST | 后台：提交添加文章 |
| `/list/` | GET | 后台：文章列表 |
| `/list/delete/` | POST | 后台：删除文章 |
| `/post/edit/:id` | GET | 后台：编辑文章页 |
| `/post/edit_do/` | POST | 后台：提交编辑文章 |
| `/user/:name` | GET | 用户列表 |
| `/category/` | GET | 后台：分类管理（需登录） |
| `/category/add/` | GET | 后台：添加分类页 |
| `/category/add_do/` | POST | 后台：提交添加分类 |
| `/category/edit/:id` | GET | 后台：编辑分类页 |
| `/category/edit_do/` | POST | 后台：提交编辑分类 |
| `/category/delete/` | POST | 后台：删除分类 |
| `/login/` | GET | 登录页 |
| `/login/handle/` | POST | 登录处理 |
| `/admin/` | GET | 后台管理 |
| `/chat/` | GET | 实时聊天室 |
| `/highcharts/` | GET | 图表展示 |
| `/about/` | GET | 关于页 |

> 后台路由均需登录后访问；未登录会 302 跳转到 `/login/`。

## 主题切换

- 默认**浅色**主题，支持一键切换**深色**模式。
- 前台：右下角悬浮按钮；后台：顶栏右上角按钮。
- 选择通过 `localStorage` 持久化，刷新后保持。

## 默认账号

| 用户名 | 密码 | 密码（MD5） | 角色 |
|--------|------|-------------|------|
| admin | 123456 | e10adc3949ba59abbe56e057f20f883e | 管理员 |

> 登录后台请使用 `admin / 123456`，生产环境请登录后尽快修改密码。

## 数据库表

### post（文章表）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | int PK | 主键 |
| type | tinyint | 文章类型 |
| title | varchar(100) | 文章标题 |
| summary | varchar(500) | 文章简介 |
| content | longtext | 文章内容 |
| addtime | datetime | 添加时间 |
| updatetime | timestamp | 更新时间（自动） |
| status | tinyint | 状态（0 正常 / 1 删除） |
| spam | tinyint | 是否草稿（0 是 / 1 否） |

### user（用户表）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | int PK | 主键 |
| username | varchar(50) | 用户名 |
| password | char(50) | 密码（MD5） |
| lastlogin | datetime | 上次登录时间 |
| isadmin | tinyint | 是否管理员（1 是 / 0 否） |

### category（分类表，包含在 nodeweb.sql 中）

| 字段 | 类型 | 说明 |
|------|------|------|
| id | int PK | 主键 |
| name | varchar(100) | 分类名 |

## 测试

```bash
npm test
```

- 使用 Mocha + Chai + Supertest + Sinon，通过 mock 数据库模型验证路由行为，**无需真实 MySQL** 即可运行。
- 覆盖首页、文章、登录、后台受保护路由等关键路径。

## 注意事项

- 项目依赖较旧（Socket.IO 1.x），Express 已升级到 4.22，生产环境建议按需升级。
- 数据库连接信息硬编码在 `conf/conf.js` 中，请勿将真实密码提交到公开仓库。
- 默认端口 `40000` 可通过环境变量 `PORT` 覆盖：`set PORT=3000`（Windows）或 `PORT=3000 npm start`。
- 导入 `nodeweb.sql` 后若已存在旧 `user` 表数据，需手动将 `admin` 记录的密码改为 MD5 值 `e10adc3949ba59abbe56e057f20f883e`（对应明文 `123456`）：
  ```sql
  UPDATE user SET username='admin', password='e10adc3949ba59abbe56e057f20f883e', isadmin=1 WHERE id=1;
  ```
