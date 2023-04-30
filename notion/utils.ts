import { Client } from '@notionhq/client';

const notion = new Client({ auth: 'secret_X5qNZfpVbfaJkNYvS6zd6XFnvnfXuRnzco6SHgg1SmM' });

(async () => {
  const pageId = 'da1fbca2ff27444cb71c3937726f20e8';
  const response = await notion.pages.retrieve({ page_id: pageId });
  // console.log(response);
  return response;
})();

const math = Math;

export { math };

export function getPageBlocks(blockId) {
  return notion.blocks.children.list({ block_id: blockId }).then((blockInfo) => {
    return blockInfo;
  });
}

/**
 * 
 * @param blockInfo      {
        "paragraph": {
          "rich_text": [
            {
              "text": {
                "content": "Lacinato kale"
              }
            }
          ]
        }
      }
 * @param block_id 
 * @returns 
 */
export function appendBlock(blockInfo, block_id = '70b995c50d6341c7a4c8b56ec7e6ec77') {
  const _blockInfo = {
    block_id,
    children: [blockInfo]
  };
  console.log('%c [ _blockInfo ]-40', 'font-size:13px; background:pink; color:#bf2c9f;', _blockInfo);
  return notion.blocks.children.append(_blockInfo).then((result) => {
    console.log('%c [ result ]-28', 'font-size:13px; background:pink; color:#bf2c9f;', result);
    return result;
  });
}
/**
 * @description 复制周报模版页面，并修改名称后粘贴
 *  @description 1. 获取模版页面信息
 *  @description 2. 递归获取模板页面的所有block信息
 *  @description 3. 组合block信息，创建新的页面
 *  @description 4. 把组合的信息拼接到模板页面的父页面中
 */
function copyPage() {
  const pageId = '91dee87830cf424fabfc6c017767a28e';
  notion.pages.retrieve({ page_id: pageId }).then((pageInfo) => {
    // return pageInfo;
    // notion.
  });
}
