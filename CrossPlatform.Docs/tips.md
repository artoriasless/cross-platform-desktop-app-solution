# Tips

> tips about developing,

## Electron -> Nodejs version match

> due to the reason that the repo use electron@22.3.25, the table content begins only from 22.x

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

## electron-edge-js version

> in this repo, i use electron-edge-js@^29.0.0 because the used electron version is 22.3.25
>
> **`if you use electron@23.x or later, you need to upgrade electron-edge-js at least 30.x`**

## **`edge-js`** invoke **`.net core`** DLL error

1. you need to publish your **`.net core library`** as **self-contained**, because the client computer might lack **`.net core runtime`**
2. add `process.env.EDGE_USE_CORECLR = '1';` before you require **`edge-js`** or **`electron-edge-js`**

## how to create **`.icns`** icon more easily on **`macOS`**

1. prepare a **.png** image with at least **512x512** size(for example named **logo.png**)
2. use command `sips -s format icns logo.png -o app.icns`

## err_connection about downloading electron mirrors or build tools

> when you use electron-builder to build installer, it will download electron mirrors from github electron release pages
>
> it might cause network connection error
>
> you can download these resources on another pc, and use some other easy ways to send to the build machine

1. **download mirrors manually** visit `https://github.com/electron/electron/releases` to download the target version mirror
2. **(optional) download build tools manually for Windows OS** if you stuck at `Get "https://github.com/electron-userland/electron-builder-binaries/releases/download/nsis-3.0.4.1/nsis-3.0.4.1.7z"` or something else, copy the link and download manually
3. **cache to local** copy or move the downloaded resources
    - local mirror store directory
        - **Mac OS** : `~/Library/Caches/electron/`
        - **Windows OS** : `%localappdata%\electron\Cache`
        - **Linux** : `~/.cache/electron`
    - local build tools store directory(for me, i only face the problem on Windows OS, i need two tools: winCodeSign and nsis)
        - **Windows OS** : `%localappdata%\electron-builder\Cache`

## Notes on Building Applications on Linux-Based Systems

1. If you use `icns` as the icon format, the build process requires **`libopenjp2-tools`** to parse `icns`.
2. **`openssl`** is required.
3. **`python`** is required.

### Installing CMake

> Manual compilation requires CMake.

-   The version of CMake provided by the traditional `apt` installation method is often outdated. Instead, install it manually: download the appropriate version from the CMake official website **`https://cmake.org/download/`**, install it, and configure it (place CMake in `/usr/local` and then configure the environment variable).

```shell
# Assuming CMake is placed in /usr/local
export PATH=/usr/local/cmake/bin:$PATH
```

### Missing opj_decompress During Build

-   apt Installation (Preferred, but the package may not be available via apt)

```shell
sudo apt update
sudo apt install openjpeg-tools

# After installation, check if it was successful with the following command
which opj_decompress
```

-   Manual Compilation and Installation (Fallback Option)

```shell
# Ensure you have a CMake environment set up
# It's recommended to use git clone to download the source code from GitHub, but due to network issues or the need for a VPN, you can download the source manually.
# GitHub repository: https://github.com/uclouvain/openjpeg.git
# Extract the source code to a directory, e.g., ~/archive
cd openjpeg-master
mkdir build && cd build
cmake ..
make -j$(nproc)
sudo make install
```

### Stuck While Downloading the fpm Package During .deb Build

-   Manual Download (Not Recommended)

    > During the build process, **`fpm`** is required to create the **`.deb`** installation package. Due to network issues, the download may fail or get stuck during the process.
    >
    > Based on the error message, copy the download link, manually download the file, and place it in **`~/.cache/electron-builder`**.
    >
    > Huawei mirror link: `https://mirrors.huaweicloud.com/electron-builder-binaries/`

-   Use System-Installed fpm Instead (Recommended)

    > Reference link: `https://github.com/electron-userland/electron-builder/issues/3901`

    1. Install prerequisites:

        ```shell
        sudo apt install libyaml-dev
        sudo apt install zlib1g-dev
        ```

    2. Install Ruby (Manual Installation Recommended):

        > The version of Ruby installed via apt is often outdated and may cause issues, though you can try using it.

        ```shell
        # Download the Ruby source code from GitHub
        cd ruby-3.3.3
        cd ruby-3.3.3
        sudo ./configure
        sudo make
        sudo make install
        ```

    3. Modify the RubyGems source to ensure successful installation:

        ```shell
        # Check the default source (the output may vary)
        gem sources
        # Default: https://rubygems.org/

        # Remove the default source
        gem sources --remove https://rubygems.org/

        # Add a domestic source (for users in China)
        gem sources -a https://gems.ruby-china.com

        # Alternatively:
        gem sources --add https://mirrors.tuna.tsinghua.edu.cn/rubygems/
        ```

    4. Install fpm:

        ```shell
        sudo gem install fpm
        ```

    5. Check if fpm was installed successfully:

        ```shell
        fpm --version
        ```

    6. **【For Linux only】The most crucial step is to declare the use of the system FPM before executing the build script.**

        ```json
        {
            "scripts": {
                "build:linux": "USE_SYSTEM_FPM=true art-bin build linux"
            }
        }
        ```

### Fixing Build Failures for .NET Core DLLs in Node.js

> When calling C# DLLs in Node.js, the code needs to be compiled.
>
> On macOS and Windows, the required environments are generally well-prepared, so there are no issues.
>
> This section focuses on **`linux-based`** systems.
>
> **`Compilation requires clang version 14 or higher (tested with version 15, recommended to use version 15).`**
>
> BTW: Why not use apt or source code to install clang directly?
>
> Answer: Clang has various library dependencies, which can create a complex dependency chain. If you don't mind the hassle, feel free to try.

-   Installing Clang

    -   Download the appropriate version of LLVM from https://github.com/llvm/llvm-project/releases (LLVM and Clang versions are the same; choose the LLVM release that matches your needs). It's recommended to use version 15.x to match macOS. After downloading the LLVM project, execute the following commands. The CMake compilation process can be time-consuming, potentially taking 4-5 hours.

    ```shell
    cd llvm-project
    mkdir build
    cd build
    # Ensure you have GCC and G++ installed locally
    # gcc --version
    # g++ --version
    # If not installed, update your packages using sudo apt upgrade
    cmake -DLLVM_ENABLE_PROJECTS=clang -DCMAKE_BUILD_TYPE=Release -G "Unix Makefiles" ../llvm
    make
    make install
    ```

-   Replacing GCC, G++, CC, and CPP (C++) with Clang, Add symbolic links to point GCC, G++, CC, and C++ to Clang:

    ```shell
    # Check the location of Clang
    which clang
    # Output: /usr/local/bin/clang

    # Update symbolic links
    sudo ln -s /usr/local/bin/clang /usr/local/bin/gcc
    sudo ln -s /usr/local/bin/clang /usr/local/bin/g++
    sudo ln -s /usr/local/bin/clang /usr/local/bin/cc
    sudo ln -s /usr/local/bin/clang /usr/local/bin/c++

    # Initially attempted to remove gcc, g++, etc., installed via apt, but later on a new UOS system, removing them caused the system to crash
    # Therefore, it is not recommended to remove the original gcc, g++, etc., and modifying the symlink to change their target is sufficient
    ```

-   Configuring .NET

    > After installing .NET through the official method, you need to adjust the links to ensure the edgejs library can locate the .NET runtime SDK.
    >
    > .NET download link: https://dotnet.microsoft.com/zh-cn/download/dotnet/thank-you/sdk-6.0.423-linux-arm64-binaries

    ```shell
    # Locate the dotnet directory
    which dotnet
    # Output: /usr/share/dotnet/dotnet

    # Adjust the symbolic link
    sudo ln -s /usr/share/dotnet/dotnet /usr/local/bin/dotnet
    # /usr/local/bin/dotnet is the conventionally used path for other libraries to locate dotnet

    # If multiple versions of dotnet are installed, you can switch the default version using the following commands:
    # 1. List installed versions
    dotnet --list-sdks

    # 2. Specify a specific version
    dotnet new globaljson --sdk-version 6.0.202

    # 3. Check the dotnet version
    dotnet --version
    ```

## Common Errors and Q&A

### Segmentation Fault (Core Dumped)

-   This issue has been encountered on UOS.
-   On UOS, when using edgejs or electron-edge-js to call .NET Core DLLs, you may encounter a segmentation fault (core dumped) error. This is generally caused by not allowed access, i.e., insufficient permissions. Running the process with sudo should resolve the issue.
