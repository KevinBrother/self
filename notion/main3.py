import json
import uuid
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs

import requests

# 用于调用 Notion API 的客户端
notion = requests.Session()
notion.headers.update({'Notion-Version': '2022-06-28',
                      'Authorization': 'Bearer secret_X5qNZfpVbfaJkNYvS6zd6XFnvnfXuRnzco6SHgg1SmM'})

# 定义 Notion 页面 ID 和 Block ID
page_id = 'da1fbca2ff27444cb71c3937726f20e8'
block_id = '70b995c50d6341c7a4c8b56ec7e6ec77'

# 复制 Notion 页面


def copy_page():
    template_page_id = '91dee87830cf424fabfc6c017767a28e'
    template_page_info = notion.get(
        f'https://api.notion.com/v1/pages/{template_page_id}').json()
    template_block_info = recursively_get_block_info(
        template_page_info['parent']['database_id'], template_page_info['id'])
    new_page_info = create_new_page(
        template_page_info['parent']['database_id'], template_page_info['properties']['Name']['title'][0]['text']['content'])
    for block in template_block_info:
        append_block(new_page_info['id'], block)

# 递归获取 Notion 页面的所有 Block 信息


def recursively_get_block_info(database_id, page_id):
    block_info = notion.get(
        f'https://api.notion.com/v1/blocks/{page_id}/children').json()
    block_list = [block_info]
    if block_info['has_more']:
        next_cursor = block_info['next_cursor']
        while next_cursor:
            block_info = notion.get(
                f'https://api.notion.com/v1/blocks/{page_id}/children?page_cursor={next_cursor}').json()
            block_list.append(block_info)
            next_cursor = block_info['next_cursor']
    return block_list

# 创建新的 Notion 页面


def create_new_page(database_id, page_name):
    new_page_info = {
        'parent': {
            'database_id': database_id
        },
        'properties': {
            'Name': {
                'title': [
                    {
                        'text': {
                            'content': page_name
                        }
                    }
                ]
            }
        }
    }
    response = notion.post(
        'https://api.notion.com/v1/pages', json=new_page_info)
    return response.json()

# 把 Block 信息拼接到 Notion 页面的父页面中


def append_block(page_id, block_info):
    new_block_info = {
        'parent': {
            'page_id': page_id
        },
        'children': block_info['results']
    }
    notion.patch(
        f'https://api.notion.com/v1/blocks/{block_id}/children', json=new_block_info)

# 处理 GitLab Merge Request


def handle_merge_request(merge_request_info):
    user = merge_request_info.get('user', {})
    project = merge_request_info.get('project', {})
    object_attributes = merge_request_info.get('object_attributes', {})
    if user.get('name') == 'caojunjie':
        # 项目名：project.get('name')
        # 分支名：object_attributes.get('source_branch')
        # 标题：object_attributes.get('title')
        # 描述：object_attributes.get('description')
        # 地址：object_attributes.get('url')
        # 组合方式 [项目名/分支名](地址): 描述
        block_info = {
            'paragraph': {
                'rich_text': [
                    {
                        'type': 'text',
                        'text': {
                            'content': f"[{project.get('name')}/{object_attributes.get('source_branch')}]({object_attributes.get('url')}): {object_attributes.get('description')}"
                        }
                    }
                ]
            }
        }
        append_block(page_id, block_info)


class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'text/html')
        self.send_header(
            'Cache-Control', 's-max-age=1, stale-while-revalidate')
        self.end_headers()
        query = parse_qs(urlparse(self.path).query)
        slug = query.get('slug', [''])[0]
        path = f'/api/item/{uuid.uuid4()}'
        self.wfile.write(
            f'Hello! Go to item: <a href="{path}">{path}</a>'.encode())

    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        content_type = self.headers.get('Content-Type', '')
        if content_type == 'application/json':
            merge_request_info = json.loads(self.rfile.read(content_length))
            handle_merge_request(merge_request_info)
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'msg': 'success'}).encode())
        else:
            self.send_error(400, 'Unsupported Content-Type')

    def log_message(self, format, *args):
        # 禁用日志输出
        pass


if __name__ == '__main__':
    server_address = ('', 8080)
    httpd = HTTPServer(server_address, RequestHandler)
    print(f'Starting server on http://{server_address[0]}:{server_address[1]}')
    httpd.serve_forever()
