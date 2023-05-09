#!/usr/bin/env zx
// 中债登定制化 中需要验证 rpa项目是否有使用到投毒npm包
// 目前的方案效率较低，需要优化

import { readFirstColumn, checkNpmPackage } from './utils.mjs';

const dirs = [
  'D:\\workspace\\datagrand/console-ui-react-v2',
  'D:\\workspace\\datagrand/robot-ui',
  'D:\\workspace\\datagrand/studio',
  'D:\\workspace\\datagrand/console-ui'
];

async function main() {
  const file = './data/4月投毒上报.xlsx';
  const firstColumnData = await readFirstColumn(file);
  for (let dir of dirs) {
    await $`echo ${dir} >> data/result.txt`;
    for (let packageName of firstColumnData) {
      await checkNpmPackage(packageName, dir);
    }
  }
}

main();
