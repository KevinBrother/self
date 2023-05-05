import { appendBlock } from './utils';

export async function handleMergeRequest(mergeRequestInfo) {
  const { user = {}, project = {}, object_attributes = {} } = mergeRequestInfo;
  if (user.name === 'caojunjie') {
    // 项目名：project.name
    // 分支名：object_attributes.source_branch
    // 标题：object_attributes.title
    // 描述：object_attributes.description
    // 地址：object_attributes.url
    // 组合方式 [项目名/分支名](地址): 描述
    const blockInfo = {
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: `[${project.name}]${object_attributes.title}: ${object_attributes.description}`,
              ...(object_attributes.url
                ? {
                    link: {
                      url: object_attributes.url
                    }
                  }
                : {})
            }
          }
        ]
      }
    };

    await appendBlock(blockInfo);
  }
}
