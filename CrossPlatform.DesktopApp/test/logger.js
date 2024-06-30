const log4js = require('log4js');

const logger = {
  lineBreak: (placeholderContent = '', repeat = false) => {
    const lineBreakContent = repeat ? placeholderContent.repeat(10) : placeholderContent;

    console.log(lineBreakContent);
  },
  clearConsole: () => {
    console.clear();
  },
  info: (text, prefix) => {
    const logger = log4js.getLogger(prefix && typeof prefix === 'string' ? prefix : '-');

    logger.level = 'ALL';
    logger.info(text);
  },
  warn: (text, prefix) => {
    const logger = log4js.getLogger(prefix && typeof prefix === 'string' ? prefix : '-');

    logger.level = 'ALL';
    logger.warn(text);
  },
  error: (text, prefix) => {
    const logger = log4js.getLogger(prefix && typeof prefix === 'string' ? prefix : '-');

    logger.level = 'ALL';
    logger.error(text);
  },
};

module.exports = logger;
