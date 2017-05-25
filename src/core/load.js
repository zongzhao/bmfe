import program from 'commander';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import async from 'async';

import { readJSONSync } from '../utils/fs';
import pkg from '../../package.json'

// 命令根目录
const dirname = path.join(__dirname, '..', 'src/commands');

const run = (command) => {
  let repo = command.name();
  let options = command.opts();

  let _cmd = readJSONSync(path.join(dirname, repo, 'command.json'));

  if (_cmd) {
    if (_cmd.installed === false) {
      console.log(chalk.red(`此命令需要安装后才能使用，请运行 bmfe install --cmd ${repo} 进行安装。`));
      process.exit(1);
    }

    if (_cmd.requires && _cmd.requires.length) {
      _cmd.requires.some((_repo) => {
        let _stats = fs.existsSync(path.join(dirname, _repo, 'command.json'));
        if (!_stats) {
          console.log(chalk.yellow.bold(`监测到 ${repo} 所依赖的 bmfe 命令 ${_repo} 有误，可能导致 ${repo} 不能使用。`))
        }
      })
    }
  }

  System.import(`../commands/${repo}/run`)
  .then(run => {
    run.default(options);
  }).catch(err => {
    console.log(chalk.red(`${repo}执行失败`));
  })
}

// 定义当前版本
program.version(pkg.version)

// 定义使用方法
program.usage('<command>')

program
  .command('help [cmd]')
  .description('显示命令 [cmd] 的帮助')
  .action(function(cmd) {
    program.commands.some((command) => {
      if (command.name() === cmd) command.help();
    })
    if (cmd) {
      console.log(`${cmd} 不是一个 bmfe 的命令。参见 'bmfe --help'`);
    } else {
      program.help();
    }
  });

const files = fs.readdirSync(dirname);

async.each(files, function(repo, callback) {
  let _cmd = readJSONSync(path.join(dirname, repo, 'command.json'));

  if (_cmd) {
    let _pro = program.command(_cmd.name).description(_cmd.description);
    if (_cmd.alias) _pro.alias(_cmd.alias);
    if (_cmd.options.length) {
      _cmd.options.some((opt) => {
        _pro.option(opt.flags, opt.description)
      })
    }
    _pro.action(run);
  }

  callback();
}, function() {});

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.help();
}
