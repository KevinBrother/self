import requests


def append_children(block_info):

    url = "https://api.notion.com/v1/blocks/70b995c50d6341c7a4c8b56ec7e6ec77/children"

    headers = {
        "accept": "application/json",
        "Notion-Version": "2022-06-28",
        "Authorization": "Bearer secret_X5qNZfpVbfaJkNYvS6zd6XFnvnfXuRnzco6SHgg1SmM"}

    # block_info = {
    #     "children": [
    #         {
    #             "object": "block",
    #             "type": "heading_2",
    #             "heading_2": {
    #                 "rich_text": [{"type": "text", "text": {"content": "Lacinato kale"}}]
    #             }
    #         },
    #         {
    #             "object": "block",
    #             "type": "paragraph",
    #             "paragraph": {
    #                 "rich_text": [
    #                     {
    #                         "type": "text",
    #                         "text": {
    #                             "content": "Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",
    #                             "link": {"url": "https://en.wikipedia.org/wiki/Lacinato_kale"}
    #                         }
    #                     }
    #                 ]
    #             }
    #         }
    #     ]
    # }

    response = requests.patch(url, headers=headers, json=block_info)
    print(response.text)
