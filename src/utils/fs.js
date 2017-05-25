import fs from 'fs';
import chalk from 'chalk';
import mkdirp from 'mkdirp';
import path from 'path'

// 读取 json
export const readJSONSync = (filename) => {
  try {
    let filedata = fs.readFileSync(filename)
    if (filedata) {
      return JSON.parse(filedata)
    }
  } catch (e) {
    return null
  }
}

// 创建目录
export const pMkdir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdir(dir, (err) => {
      if (err) {
        console.log(`Make ${dir} ... ${chalk.red(err.message)}`)
      } else {
        console.log(`Make ${dir} ... ${chalk.green('OK')}`)
      }
    })
  } else {
    console.log(`Make ${dir} ... ${chalk.green('OK')}`)
  }
}

// 写文件
export const pWriteFile = (filename, retmpl) => {
  let tmpl = fs.readFileSync(retmpl)
  let dir = path.dirname(filename);

  if (dir) {
    mkdirp(dir, function(err) {
      if (err) {
        console.log(`Write ${filename} ... ${chalk.red(err.message)}`)
        return;
      }

      fs.writeFile(filename, tmpl, function(err) {
        if (err) {
          console.log(`Write ${filename} ... ${chalk.red(err.message)}`)
        } else {
          console.log(`Write ${filename} ... ${chalk.green('OK')}`)
        }
      });
    });
    return
  }

  fs.writeFile(filename, tmpl, (err) => {
    if (err) {
      console.log(`Write ${filename} ... ${chalk.red(err.message)}`)
    } else {
      console.log(`Write ${filename} ... ${chalk.green('OK')}`)
    }
  })
}
