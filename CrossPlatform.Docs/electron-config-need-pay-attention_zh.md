# 需要注意的一些配置项

## package.json

### homepage

-   此字段主要针对 **`linux-based`** 的系统，如果没有该字段，会导致 **`linux-based`** 系统下报错

### author

-   需要调整为如下所示，主要也是针对 **`linux-based`** 系统

```jsonc
// 这样的写法在 linux-based 系统下会构建报错
{
    "author": "artoriasless"
}

// 需要采用如下格式
{
    "author": {
        "name": "artoriasless",
        "email": "artoriasless@github.com"
    }
}
```

## linux.icon : 构建所需配置的 linux 图标配置项

-   示例配置，但是有可能会出现 **`convertIcnsToPng`** 的报错，即使安装了 **`opj_decompress`** 也无法解决

```jsonc
{
    "linux": {
        // 在 linux-based 系统下，图标是可以使用 icns 格式的
        "icon": "/path/to/your/icon.icns",
        "target": [
            {
                "target": "deb",
                "arch": ["x64", "arm64"]
            }
        ]
    }
}
```

-   兼容性更好的配置写法

> 1. 准备一个 256x256 尺寸的 png
>
> 2. 找一个在线的免费 resize 图片的网站
>
> 3. 基于 256 尺寸，分别生成 8x8、16x16、32x32、48x48、64x64、128x128、256x256 的 png 图标
>
> 4. 分别名为 **`icon_${width}x${height}.png`**
>
> 5. 存放到一个文件夹 icons
>
> 6. 在构建的时候，应用图标指向这个文件夹

```jsonc
{
    "linux": {
        // 这是一个存放各个尺寸 png 图标的文件夹
        "icon": "/path/to/your/icon/folder",
        "target": [
            {
                "target": "deb",
                "arch": ["x64", "arm64"]
            }
        ]
    }
}
```
