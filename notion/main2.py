import http.server
import json
import urllib.parse

class MergeRequestHandler(http.server.BaseHTTPRequestHandler):
    def do_POST(self):
        content_length = int(self.headers.get('Content-Length', 0))
        content_type = self.headers.get('Content-Type', '')
        if content_type == 'application/json':
            merge_request_info = json.loads(self.rfile.read(content_length))
            self.handle_merge_request(merge_request_info)
        else:
            self.send_error(400, 'Unsupported Content-Type')

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

if __name__ == '__main__':
    server_address = ('', 8080)
    httpd = http.server.HTTPServer(server_address, MergeRequestHandler)
    httpd.serve_forever()