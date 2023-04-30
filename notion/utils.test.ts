import { expect, test } from 'vitest';
import { getPageBlocks, math, appendBlock } from './utils';

/* test('getPageBlocks', async () => {
  const blockId = 'da1fbca2ff27444cb71c3937726f20e8';
  const blocks = await getPageBlocks(blockId);
  console.log('%c [ blocks ]-7', 'font-size:13px; background:pink; color:#bf2c9f;', blocks);

  expect(blocks).toBeInstanceOf(Array);
});

test('math.sqrt()', () => {
  console.log('%c [ math.sqrt(4) ]-7', 'font-size:13px; background:pink; color:#bf2c9f;', math.sqrt(4));
  expect(math.sqrt(4)).toBe(2);
  expect(math.sqrt(144)).toBe(12);
  expect(math.sqrt(2)).toBe(math.SQRT2);
  console.log('%c [ math.sqrt(4) ]-7', 'font-size:13px; background:pink; color:#bf2c9f;', math.sqrt(4));
});
 */

test('appendBlock', async () => {
  const blockInfo = {
    paragraph: {
      rich_text: [
        {
          text: {
            content: 'Lacinato kale121'
          }
        }
      ]
    }
  };
  const blockId = '70b995c50d6341c7a4c8b56ec7e6ec77';
  const result = await appendBlock(blockInfo, blockId);
  console.log('%c [ result ]-28', 'font-size:13px; background:pink; color:#bf2c9f;', result);

  expect(result).toBeInstanceOf(Object);
});
