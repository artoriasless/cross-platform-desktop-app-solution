const deasync = require('deasync');
const inquirer = require('inquirer');

const { userConfigForBuildKey } = require('../constants');

//#region 获取用户配置，通过终端用户输入，临时存放到 global[userConfigForBuildKey]
const getUserConfig = () => {
  const needCodeSign = (() => {
    const _promptPromise_ = () => new Promise(resolve => {
      inquirer
        .prompt([
          {
            type: 'confirm',
            name: 'needCodeSign',
            message: 'do you need code sign for the application',
          },
        ])
        .then(answers => {
          resolve(answers);
        })
        .catch(() => {
          resolve(false);
        });
    });
    let _done_ = false;
    let _result_ = false;

    _promptPromise_().then(answers => {
      _result_ = answers.needCodeSign;
      _done_ = true;
    });

    deasync.loopWhile(() => !_done_);

    return _result_;
  })();

  global[userConfigForBuildKey] = {
    needCodeSign,
  };
};
//#endregion

module.exports = () => {
  // fetchRemoteBuildConfig();

  getUserConfig();
};
