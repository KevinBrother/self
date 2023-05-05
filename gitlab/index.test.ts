import { expect, test } from 'vitest';
import { getGroupProjects, getAccessLevel, setAccessLevel } from './index';

test('getGroupProjects', async () => {
  const groupId = 179;
  const { data } = await getGroupProjects(groupId);
  expect(data).toBeInstanceOf(Array);
  const projects = data.map((item) => ({ id: item.id, name: item.name }));
  // console.log(`%c [ ids 长度为${ids.length}  ]`, ids);
  console.log('长度为：%s， 分别是： ', projects.length, projects);
  // 期望{name: 'studio', id: 959}在projects中
  expect(projects).toContainEqual({ name: 'studio', id: 959 });
});

test('getAccessLevel', async () => {
  const projectId = 959;
  const userId = 627;
  const { data } = await getAccessLevel(projectId, userId);
  console.log('%c [ data ]-7', 'font-size:13px; background:pink; color:#bf2c9f;', data);
  expect(data.access_level).toBe(30);
});

test('setAccessLevel', async () => {
  const projectId = 959;
  const userId = 658;
  const accessLevel = 40;
  const { data } = await setAccessLevel(projectId, userId, accessLevel);
  console.log('%c [ data ]-7', 'font-size:13px; background:pink; color:#bf2c9f;', data);
  expect(data.access_level).toBe(40);
});
