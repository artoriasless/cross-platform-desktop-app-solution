# pay attention to some config item

## package.json

### homepage

-   This field is primarily intended for **`linux-based`** systems. If this field is missing, it may cause errors on **`linux-based`** systems.

### author

-   It needs to be adjusted as shown below, primarily for **`linux-based`** systems.

```jsonc
// This format will cause build errors on linux-based systems
{
    "author": "artoriasless"
}

// The following format should be used instead
{
    "author": {
        "name": "artoriasless",
        "email": "artoriasless@github.com"
    }
}
```

## linux.icon : build app icon field for for build on linux-based system

-   Example configuration, but it may cause the **`convertIcnsToPng`** error, even if **`opj_decompress`** is installed, the issue might not be resolved.

```jsonc
{
    "linux": {
        // On linux-based systems, icons can use the icns format
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

-   A more compatible configuration approach

> 1. Prepare a 256x256-sized PNG.
>
> 2. Use an online free image resize tool.
>
> 3. Based on the 256 size, generate PNG icons for each of the following sizes: 8x8, 16x16, 32x32, 48x48, 64x64, 128x128, 256x256
>
> 4. Name them as **`icon_${width}x${height}.png`**.
>
> 5. Store them in a folder named icons.
>
> 6. During the build process, point the application icon to this folder.

```jsonc
{
    "linux": {
        // This folder contains PNG icons in multiple sizes
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
