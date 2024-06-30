import path from 'path';
import fs from 'fs-extra';

const platformAliasDirMap: Map<string, string> = new Map([
  ['darwin', 'mac'],
  ['win32', 'win'],
  ['linux', 'linux'],
]);
const archAliasDirMap: Map<string, string> = new Map([
  ['ia32', 'x86'],
  ['x64', 'x64'],
  ['arm64', 'arm64'],
]);

/**
 * 针对 electron 构建出应用时启用 asar 压缩的场景，获取真正的包目录地址 app.asar => app.asar.unpacked
 *
 * @return
 */
const getAppDir = (): string => {
  const pathSep = path.sep;
  const defaultDir = process.cwd();
  let unpackedDir = defaultDir;

  // 包含 app.asar 目录节点，在构建后的客户端内部，需要调整路径，进行替换
  if (defaultDir.indexOf(`${pathSep}app.asar${pathSep}`) !== -1) {
    unpackedDir = defaultDir.replace(`${pathSep}app.asar${pathSep}`, `${pathSep}app.asar.unpacked${pathSep}`);
  }

  // 二次确认路径是否存在
  if (fs.existsSync(unpackedDir)) {
    return unpackedDir;
  }

  return defaultDir;
};

/**
 * 针对 electron 构建出应用时启用 asar 压缩的场景，根据相对路径，获取 dll 的绝对路径
 *
 * @param {string} relativePath DLL 库的相对路径
 * @returns
 */
const getDllPath = (relativePath: string): string => {
  const appDir = getAppDir();
  let dllBuildDir = path.join(appDir, 'dotnet-dll', platformAliasDirMap.get(process.platform) || 'unknown-platform', archAliasDirMap.get(process.arch) || 'unknown-arch');

  // TODO，如果在应用找不到，则需要调整，从 appdata 等目录寻找远程下载的 dll

  // 针对虚拟机下，或者云桌面的场景，路径不是盘符开始的，需要调整
  // 前提条件：非 macos 或 linux 下
  if (/^[^a-zA-Z]/.test(dllBuildDir) && process.platform !== 'darwin' && process.platform !== 'linux') {
    dllBuildDir = dllBuildDir.replace(/^[^a-zA-Z]*/, '');
  }

  return path.join(dllBuildDir, relativePath);
};

/**
 * 桥接调用 dll 的方法
 *
 * @param {string} relativeDll DLL 文件路径，相对于 dotnet-dll/${platform}/${arch} 目录，不需要绝对路径
 * @param {string} className 类名，需要包含 namespace，如：CrossPlatform.Library.SystemUtils4Node
 * @param {string} methodName 方法名
 * @param {any} params 入参，可选，最终会 JSON.stringify 后传递给 dll
 * @returns
 */
const dllBridgeInvoke = <TResult>(relativeDll: string, className: string, methodName: string, params?: any): Promise<TResult> =>
  new Promise((resolve, reject) => {
    try {
      process.env.EDGE_USE_CORECLR = '1';

      const dllPath = getDllPath(relativeDll);

      // 根据是否是 electron 环境，加载 edge-js 或者 electron-edge-js
      const edge = (() => {
        if (!!process.versions && !!process.versions.electron) return require('electron-edge-js');

        return require('edge-js');
      })();
      const driver = edge.func({
        assemblyFile: dllPath,
        typeName: className,
        methodName,
      });

      const paramIn = params === undefined || params === null ? {} : params;

      driver(JSON.stringify(paramIn), (err: Error, res: TResult) => {
        console.info('+++++++++++++++++++++++++');
        console.info(res, err);
        console.info('+++++++++++++++++++++++++');

        if (err) {
          reject(err);

          return;
        }

        resolve(res);
      });
    } catch (err) {
      reject(err);
    }
  });

export default dllBridgeInvoke;

module.exports = dllBridgeInvoke;
