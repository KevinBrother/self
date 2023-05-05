// curl "https://git.datagrand.com/api/v4/projects?access_token=nG9zwEE31o7VUVdvf8ZS"
// curl "https://git.datagrand.com/api/v4/projects?private_token=nG9zwEE31o7VUVdvf8ZS"

// curl "https://git.datagrand.com/api/v4/users/627/projects?private_token=nG9zwEE31o7VUVdvf8ZS"

// curl "https:///git.datagrand.com/api/v4/groups/179/projects?private_token=nG9zwEE31o7VUVdvf8ZS"

// 获取groupid为179（RPA）与1063（rpa-fronted）的项目，并把该项目下的所有仓库分配给用户id为xxx的用户
// 统一分配前端仓库给某人
// 靖文 658
// 我的为 627
import axios from 'axios';
const privateToken = 'nG9zwEE31o7VUVdvf8ZS';

export function getGroupProjects(groupId: number) {
  return axios.get(`https://git.datagrand.com/api/v4/groups/${groupId}/projects?private_token=${privateToken}`);
}

export function setAccessLevel(projectId: number, userId: number, accessLevel: number) {
  return axios.put(
    `https://git.datagrand.com/api/v4/projects/${projectId}/members/${userId}?private_token=${privateToken}&access_level=${accessLevel}`
  );
}

/**
 * 
 * @description10：
      10 Guest权限，允许用户查看和评论项目。
      20：Reporter权限，允许用户创建问题和合并请求，以及查看项目的代码、问题和合并请求。
      30：Developer权限，允许用户在项目中创建、修改和删除代码、问题和合并请求。
      40：Maintainer权限，允许用户在项目中执行所有操作，包括管理代码库、添加/删除成员、管理问题和合并请求等。
      50：Owner权限，允许用户执行与Maintainer相同的操作，同时还可以更改项目的设置和转让项目所有权。
 * @param projectId 
 * @param userId 
 * @returns 
 */
export function getAccessLevel(projectId: number, userId: number) {
  return axios.get(`https://git.datagrand.com/api/v4/projects/${projectId}/members/${userId}?private_token=${privateToken}`);
}

async function main() {
  const { data } = await getGroupProjects(179);
  const { data: data2 } = await getGroupProjects(1063);
  const projects = data.concat(data2);
  const userId = 627;
  const accessLevel = 30;
  for (const project of projects) {
    const projectId = project.id;
    const { data } = await getAccessLevel(projectId, userId);
    // 自己至少是Developer权限时，才能把别人的权限提升到Developer
    if (data.access_level >= accessLevel) {
      // 把对方设置成和自己一样的权限？
      await setAccessLevel(projectId, userId, accessLevel);
    }
  }
}

main();
