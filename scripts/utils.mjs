import xlsx from 'xlsx';
export async function readFirstColumn(file) {
  const workbook = xlsx.readFile(file);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const range = xlsx.utils.decode_range(worksheet['!ref']);

  const firstColumnData = [];
  for (let row = range.s.r; row <= range.e.r; row++) {
    const cellAddress = xlsx.utils.encode_cell({ c: 0, r: row });
    const cellValue = worksheet[cellAddress]?.v;
    if (cellValue !== undefined) {
      firstColumnData.push(cellValue);
    }
  }

  return firstColumnData;
}

export async function checkNpmPackage(packageName, dir) {
  return new Promise(async (resolve, rejects) => {
    var output = '';
    try {
      // TODO 在zxjs里使用process.chdir、cd命令都无法改变后续 bash 命令的目录，所以这里先切换目录再执行npm ls XXXX
      let { stdout } = await $`cd ${dir} && npm ls ${packageName}`;
      output = stdout;
    } catch (p) {
      output = p;
    } finally {
      // 当存在时，向data/result.txt中写入结果
      if (!output.toString().includes('(empty)')) {
        await $`echo ${packageName} >> data/result.txt`;
      }
      resolve();
    }
  });
}
