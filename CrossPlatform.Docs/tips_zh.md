# Tips

> 开发过程中遇到的一些小问题，记录一下

## Electron -> Nodejs 版本匹配列表

> 由于本项目使用的是 electron@22.3.25， 所以表格中展示的 electron 版本只考虑从 22.x 之后的

| Electron        | Node.Js  |
| --------------- | -------- |
| Electron 22.x   | v16.17.1 |
| Electron 23.x   | v18.12.1 |
| Electron 24.x   | v18.14.0 |
| Electron 25.x   | v18.15.0 |
| Electron 26.x   | v18.16.1 |
| Electron 27.x   | v18.17.1 |
| Electron 28.x   | v18.18.2 |
| Electron 29.x   | v20.9.0  |
| Electron 30.1.x | v20.14.0 |
| Electron 31.x   | v20.14.0 |

## electron-edge-js 版本

> 此项目中使用 electron@22.3.25， 所以对应的 electron-edge-js 使用版本 ^29.0.0
>
> **`如果你需要使用 electron@23.x 或更高版本， 升级 electron-edge-js 的版本至少到 30.x`**

## **`edge-js`** 调用 **`.net core`** DLL 报错

1. 由于部分客户端电脑缺少 **`.net core 运行时`**，所以你需要把你的 **`.net core 库`** 发布为 **独立** 版本
2. 在你引入 **`edge-js`** 或者 **`electron-edge-js`** 之前，添加一句 `process.env.EDGE_USE_CORECLR = '1';`

## 在 **`macOS`** 上更简单地创建 **`.icns`** 图标

1. 准备一张至少 **512x512** 大小的 **.png** 图像(命名任意，比如 **logo.png**)
2. 使用命令 `sips -s format icns logo.png -o app.icns`

## 构建应用时遇到下载失败的问题

> 当你使用 electron-builder 构建安装包时，builder 会从 github 上的 electron 发布记录中下载对应版本的镜像
>
> 由于网络原因，可能会导致下载失败
>
> 不过你可以从另一台机器上手动下载在这资源，然后用简单的办法（优盘、内网传输）将资源发送到构建机器上

1. **手动下载镜像** 访问 `https://github.com/electron/electron/releases` 下载对应版本的 electron 镜像
2. **（可选） Windows 下下载构建工具** 如果你卡在 `Get "https://github.com/electron-userland/electron-builder-binaries/releases/download/nsis-3.0.4.1/nsis-3.0.4.1.7z"` 或其他资源的下载问题上，复制链接，然后手动下载
3. **缓存到本地** 复制，或移动下载后的资源
    - 本地镜像缓存目录
        - **Mac OS** : `~/Library/Caches/electron/`
        - **Windows OS** : `%localappdata%\electron\Cache`
        - **Linux** : `~/.cache/electron`
    - 本地构建工具缓存目录（对我来说，我只在 Windows 下遇到这个问题，涉及两个构建工具：winCodeSign 和 nsis）
        - **Windows OS** : `%localappdata%\electron-builder\Cache`

## 基于 linux 系统的应用构建注意事项

1. 如果使用了 icns 作为图标，则在构建过程中需要用到 **`libopenjp2-tools`** 解析 icns
2. 需要 **`openssl`**
3. 需要 **`python`**

### cmake 安装

> 手动编译都需要用到 cmake

-   传统 apt 安装方式提供的 cmake 版本较低，通过手动安装：到 cmake 官网 **`https://cmake.org/download/`** 下载对应版本，安装，配置（cmake 放在 usr/local 下，然后再配置环境变量）

```shell
# 假设 cmake 放在 /usr/local 中
export PATH=/usr/local/cmake/bin:$PATH
```

### 构建时提示缺少 opj_decompress

-   apt 安装（首选，但是有可能 apt 上没有这个包）

```shell
sudo apt update
sudo apt install openjpeg-tools

# 执行后通过以下命令检查是否安装成功
which opj_decompress
```

-   手动编译安装（兜底方案）

```shell
# 需要保证已经有 cmake 环境
# 推荐是用 git clone ，从 github clone 源码，但是因为网络，外加需要挂 VPN ，直接手动下载
# github 仓库地址：https://github.com/uclouvain/openjpeg.git
# 解压源码到某个目录，比如 ~/archive
cd openjpeg-master
mkdir build && cd build
cmake ..
make -j(nproc)
sudo make install
```

### 构建 .deb 时，卡在下载 fpm 包

-   手动下载（亲测不太行）

    > 在构建过程中需要用到 **`fpm`** 来构建 **`.deb`** 的安装包，由于网络等问题会导致构建过程中下载失败，或者一直卡在下载步骤
    >
    > 根据报错信息，复制下载链接，手动下载之后，存放到 **`~/.cache/electron-builder`**
    >
    > 附上华为镜像地址：`https://mirrors.huaweicloud.com/electron-builder-binaries/`

-   使用系统自带 fpm 代替（推荐）

    > 参考链接：`https://github.com/electron-userland/electron-builder/issues/3901`

    1. 安装前置依赖

        ```shell
        sudo apt install libyaml-dev
        sudo apt install zlib1g-dev
        ```

    2. 安装 ruby ，推荐手动安装，自己编译

        > 通过 apt 安装的版本有点低，好像会有问题，不过可以再尝试一下

        ```shell
        # 从 github 上下载 ruby 源码
        cd ruby-3.3.3
        sudo ./configure
        sudo make
        sudo make install
        ```

    3. 修改 gems 源以便正常安装

        ```shell
        # 查看默认源，可能和输出结果有出入
        gem sources
        // https://rubygems.org/

        # 删除默认源
        gem sources --remove https://rubygems.org/

        # 添加国内源
        gem sources -a https://gems.ruby-china.com

        # 或者
        gem sources --add https://mirrors.tuna.tsinghua.edu.cn/rubygems/
        ```

    4. 安装 fpm

        ```shell
        sudo gem install fpm
        ```

    5. 检查 fpm 是否安装成功

        ```shell
        fpm --version
        ```

### 修复 nodejs 下构建 .net core DLL 失败的问题

> 在 nodejs 中调用 c# DLL ，是需要把代码编译的
>
> 在 macos 和 window 下，相关的环境基本都比较完善，所以没什么问题
>
> 这里主要讲 **`linux-based`** 系统下的情况
>
> **`编译需要保证 clang 使用 14 及以上版本（亲测使用 15 ，建议使用 15 版本）`**
>
> BTW：为什么不通过 apt、源码等方式直接安装？
>
> 答：clang 依赖各种 lib ，存在依赖链，如果不怕麻烦可以试试。

-   clang 安装

    -   在 **`https://github.com/llvm/llvm-project/releases`** 下载对应版本 llvm （llvm 版本和 clang 版本一致，按需找 llvm 发行版本即可，推荐和 MacOS 保持一致，使用 15.x），下载对应的 llvm-project 后，执行如下命令。 cmake 编译过程耗时较久，可能会花费四五个小时。

    ```shell
    cd llvm-project
    mkdir build
    cd build
    # 这一步需要保证本地有 gcc 和 g++ 的环境
    # gcc --version
    # g++ --version
    # 如果没有的话，通过 sudo apt upgrade 更新一下包
    cmake -DLLVM_ENABLE_PROJECTS=clang -DCMAKE_BUILD_TYPE=Release -G "Unix Makefiles" ../llvm
    make
    make install
    ```

-   使用 clang 替换 gcc、g++、cc、cpp（c++）

    1.  移除 UOS 已安装的 gcc、g++ ，一般是 apt 默认安装，通过 sudo apt remove gcc 即可（这一步骤在 clang 安装完成后再做）

    ```shell
    sudo apt remove gcc
    sudo apt remove g++
    sudo apt remove cc
    sudo apt remove cpp
    sudo apt remove c++
    ```

    2. 添加软链，将 gcc、g++、cc、c++ 指向 clang

    ```shell
    # 查看 clang 所在位置
    which clang
    # 输出结果：/usr/local/bin/clang

    # 更新软链
    sudo ln -s /usr/local/bin/clang /usr/local/bin/gcc
    sudo ln -s /usr/local/bin/clang /usr/local/bin/g++
    sudo ln -s /usr/local/bin/clang /usr/local/bin/cc
    sudo ln -s /usr/local/bin/clang /usr/local/bin/c++
    ```

-   配置 dotnet

    > dotnet 通过官方的方式进行安装后，需要调整链接，避免 edgejs 库找不到 .net runtime sdk
    >
    > dotnet 下载地址: `https://dotnet.microsoft.com/zh-cn/download/dotnet/thank-you/sdk-6.0.423-linux-arm64-binaries`

    ```shell
    # 找到 dotnet 目录
    which dotnet
    # 输出结果：/usr/share/dotnet/dotnet

    # 调整软链
    sudo ln -s /usr/share/dotnet/dotnet /usr/local/bin/dotnet
    # /usr/local/bin/dotnet 为约定的地址，用于别的库找到 dotnet


    # 如果电脑装了多个版本的 dotnet，可以通过以下命令来切换默认版本
    # 1. 查看安装的版本
    dotnet --list-sdks

    # 2. 指定具体的版本
    dotnet new globaljson --sdk-version 6.0.202

    # 3. 查看 dotnet 版本
    dotnet --version
    ```

## 常见报错 Q&A

### 段错误(核心已转储)，即 Segmentation fault (core dumped)

-   这个问题在 UOS 下遇到过。
-   UOS 下，通过 edgejs 或者 electron-edge-js 调用 .net core DLL 时可能会报 段错误(核心已转储) ，即 Segmentation fault (core dumped) ，一般来说是因为 not allowed access ，即权限不足导致，sudo 启动即可
