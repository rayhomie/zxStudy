#! /usr/bin/env zx

console.log("hi zx");

//esm 可以不写async也可以使用await
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
