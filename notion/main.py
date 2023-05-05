import json
import uuid
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs

from requests import post

def handle_merge_request(self, merge_request_info):
    user = merge_request_info.get('user', {})
    project = merge_request_info.get('project', {})
    object_attributes = merge_request_info.get('object_attributes', {})
    if user.get('name') == 'caojunjie':
        # 项目名：project.get('name', '')
        # 分支名：object_attributes.get('source_branch', '')
        # 标题：object_attributes.get('title', '')
        # 描述：object_attributes.get('description', '')
        # 地址：object_attributes.get('url', '')
        # 组合方式 [项目名/分支名](地址): 描述
        block_info = {
            'paragraph': {
                'rich_text': [
                    {
                        'type': 'text',
                        'text': {
                            'content': '[{}]{}, {}'.format(project.get('name', ''), object_attributes.get('title', ''), object_attributes.get('description', '')),
                            **({'link': {'url': object_attributes.get('url', '')}} if object_attributes.get('url') else {})
                        }
                    }
                ]
            }
        }

        self.append_block(block_info)

def append_block(self, block_info):
    # 实现此函数的代码
    pass

class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-Type', 'text/html')
        self.send_header('Cache-Control', 's-max-age=1, stale-while-revalidate')
        self.end_headers()
        query = parse_qs(urlparse(self.path).query)
        slug = query.get('slug', [''])[0]
        path = f'/api/item/{uuid.uuid4()}'
        self.wfile.write(f'Hello! Go to item: <a href="{path}">{path}</a>'.encode())

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
    server_address = ('', 8001)
    httpd = HTTPServer(server_address, RequestHandler)
    print(f'Starting server on http://{server_address[0]}:{server_address[1]}')
    httpd.serve_forever()