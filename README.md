# XiaoxiaZhihuRN

---

参考知乎日报，使用网络上的[Api](https://github.com/izzyleung/ZhihuDailyPurify/wiki/%E7%9F%A5%E4%B9%8E%E6%97%A5%E6%8A%A5-API-%E5%88%86%E6%9E%90)，仿写了一个知乎日报客户端。

由于使用非正常手段获取Api，若被告知需停止共享与使用，本人会及时删除此页面与整个项目。

本项目使用React Native进行开发

## 其他客户端

[XiaoxiaZhihu iOS客户端](https://github.com/LiushuiXiaoxia/XiaoxiaZhihu_iOS)

[XiaoxiaZhihu Android客户端Java版本](https://github.com/LiushuiXiaoxia/XiaoxiaZhihu)

[XiaoxiaZhihu Android客户端Kotlin版本](https://github.com/LiushuiXiaoxia/XiaoxiaZhihu_Kotlin)

[XiaoxiaZhihu Android客户端ReactNative版本](https://github.com/LiushuiXiaoxia/XiaoxiaZhihuRN)

## 效果图

![](doc/1.png)

![](doc/2.png)

![](doc/3.png)

![](doc/4.png)

![](doc/5.png)

## 使用

### 目录介绍

```
|-- app // andorid code 
|-- React // React Native
	|--node_module // node_module code
	|--app // js code
		|-- data // http api
		|-- native // android native bridge
		|-- ui // react naive ui page
		|-- util // util
		|-- widget // custom widget
			|-- native widget//
```

### 如何启动React Native

```shell
cd React
npm install
npm start
```
### 如何启动Android 

```shell
./gradew installDebug
```

## 后续优化
* iOS客户端兼容
* 下拉刷新问题
* ToolbarAndroid做成平台无关性
* 性能优化
