# Tips

> tips about developing,

## **`edge-js`** invoke **`.net core`** DLL error

1. you need to publish your **`.net core library`** as **self-contained**, because the client computer might lack **`.net core runtime`**
2. add `process.env.EDGE_USE_CORECLR = '1';` before you require **`edge-js`** or **`electron-edge-js`**

## how to create **`.icns`** icon more easily on **`macOS`**

1. prepare a **.png** image with at least **512x512** size(for example named **logo.png**)
2. use command `sips -s format icns logo.png -o app.icns`