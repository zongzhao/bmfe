import childProcess from 'child_process';

export default function (options) {
  let _cmd = 'bmfe sc -t default --color';

  if (options.force) _cmd += ' -f';

  childProcess.execSync(_cmd, { stdio: 'inherit' });
}
