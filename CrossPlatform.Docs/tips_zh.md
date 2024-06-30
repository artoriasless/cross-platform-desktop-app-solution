# Tips

> 开发过程中遇到的一些小问题，记录一下

## **`edge-js`** 调用 **`.net core`** DLL 报错

1. 由于部分客户端电脑缺少 **`.net core 运行时`**，所以你需要把你的 **`.net core 库`** 发布为 **独立** 版本
2. 在你引入 **`edge-js`** 或者 **`electron-edge-js`** 之前，添加一句 `process.env.EDGE_USE_CORECLR = '1';`

## 在 **`macOS`** 上更简单地创建 **`.icns`** 图标

1. 准备一张至少 **512x512** 大小的 **.png** 图像(命名任意，比如 **logo.png**)
2. 使用命令 `sips -s format icns logo.png -o app.icns`