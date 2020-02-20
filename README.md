# koishi-plugin-anti-smallprogram

基于Koishi/cqhttp/酷Q 的，一个简单的反小程序插件，目前仅支持bilibili小程序

## 简介

某个版本后的QQ/哔哩哔哩客户端，分享只能发送出小程序类型消息，我qq轻聊版、PCQQ都不支持这种消息类型，~~真有你的sb腾讯，让分享的代价大大提升了~~

恰巧这两天在写QQ机器人，让bot把不支持的消息类型翻译出来不就好。

从原始消息中只能看到标题、预览图链接，以及一个url，但不清楚怎么从url获得B站视频地址，抓包又抓不动；于是只能把标题拿去B站API搜索一下返回最有可能的结果，搜索失败则只将标题和预览图发出来。

## 使用

1. 安装[koishi](https://koishi.js.org/)

2. 下载本项目`git clone https://github.com/y2361547758/koishi-plugin-anti-smallprogram.git`

3. cd koishi-plugin-anti-smallprogram && npm install

4. 配置koishi`koishi init`，在plugin中加入`./koishi-plugin-anti-smallprogram`

5. 依次启动酷Q和koishi，`koishi run -- -r ts-node/register`