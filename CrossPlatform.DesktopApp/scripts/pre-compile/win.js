const { userConfigForBuildKey } = require('../constants');

//#region 信息提示
const printBuildTips = () => {
};
//#endregion

//#region 构建的环境检查
const checkBuildRequirements = () => {
};
//#endregion

//#endregion 生成 pkg 配置文件：运行时的 pkg 和用于编译构建的 pkg.build
const genPkg = () => {
};
//#endregion

module.exports = () => {
  // mergeBuildConfigWithLocalAndRemote(); // remote config first

  printBuildTips();
  checkBuildRequirements();
  genPkg();
};
