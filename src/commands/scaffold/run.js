import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import regexfiles from 'regex-files';

import { pMkdir, pWriteFile } from '../../utils/fs'

export default function (options) {

  if (!options.force && fs.readdirSync(process.cwd()).length) {
    console.log(chalk.yellow('Warning: 此命令将会覆盖某些文件！，请使用 --force(-f) 继续。'));
    console.log(chalk.red('存在警告，放弃操作。'));
    return;
  }

  let dirname = path.join(__dirname, '..', 'src', 'template', 'default');

  regexfiles(dirname, [], [], function (err, results) {
    if (err) {
      console.log(chalk.red(err.message));
      return;
    }
    results.forEach(repo => {
      let stat = fs.lstatSync(repo);
      let rdirname = path.relative(dirname, repo);
      let fall = [];
      if (stat.isDirectory()) {
        fall.push(pMkdir(rdirname));
      } else if (!/^\./.test(rdirname)) {
        fall.push(pWriteFile(rdirname.replace('_', '.'), repo));
      }
    })
  });
}
