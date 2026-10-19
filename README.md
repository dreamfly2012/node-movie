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

> 脚本会自动创建 `nodeweb` 数据库及 `post`、`user` 表，并插入示例数据。

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
| `/post/:id` | GET | 文章详情 |
| `/post/:id/edit` | GET | 文章编辑 |
| `/user/:name` | GET | 用户列表 |
| `/user/:name/edit` | GET | 用户编辑 |
| `/category/` | GET | 分类管理 |
| `/login/` | GET | 登录页 |
| `/login/handle/` | POST | 登录处理 |
| `/admin/` | GET | 后台管理 |
| `/chat/` | GET | 实时聊天室 |
| `/highcharts/` | GET | 图表展示 |
| `/about/` | GET | 关于页 |

## 默认账号

| 用户名 | 密码（MD5） | 角色 |
|--------|-------------|------|
| dreamfly | 1408a7976f9bcf6c74f1c9aa0621d299 | 管理员 |

> 默认密码为 `dreamfly`，请登录后尽快修改。

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

## 注意事项

- 项目为个人学习项目，依赖版本较旧（Express 4.2、Socket.IO 1.x），生产环境建议升级。
- 数据库连接信息硬编码在 `conf/conf.js` 中，请勿将真实密码提交到公开仓库。
- 默认端口 `40000` 在 `bin/www` 中硬编码，如需修改请编辑该文件。
