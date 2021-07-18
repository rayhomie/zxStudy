# [zx](https://github.com/google/zx)

对node的一层封装，更方便写脚本命令行工具。

## 1】全局安装

```bash
npm i -g zx
```

## 2】使用方式

### ①方式一：shebang命令

表示的是别人在运行这个脚本的时候，需要根据环境去找zx可执行文件，然后找到zx之后去执行index.js后面的代码内容。

```js
#! /usr/bin/env zx

console.log('hi zx')
```

在执行文件之前需要加上权限：

```bash
#给文件加权限
chmod +x index.js
#执行文件
./index.js
```

### ②方式二：zx调用

```bash
#直接使用zx调用该文件
zx ./index.js
```

## 3】实现小功能练手

我们想要实现使用命令行，来备份我们的github所有仓库到本地的功能。

注意：将脚本写入扩展名为 .mjs 的文件中，以便能够在顶层使用 await。如果您更喜欢 .js 扩展名，请将您的脚本包装在类似`void async function () {...}()`的内容中。

```js
#! /usr/bin/env zx

console.log("hi zx");

//esm 顶层可以不写async也可以使用await
const data = await fetch("https://api.github.com/users/rayhomie/repos");
const urls = await data.json();
//处理数据
//获取所有的github仓库地址
const repos = urls.filter(({ fork }) => !fork).map(({ git_url }) => git_url);

//创建本地目录
await $`rm -rf backups`; //使用zx可以将linux命令进行转化
await $`mkdir backups`;
cd("./backups"); //zx提供的函数

Promise.all(
  repos.map((url) => {
    // return $`git clone ${url}`;
  })
);
```

