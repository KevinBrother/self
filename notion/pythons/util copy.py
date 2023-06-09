import requests

# url = "https://api.notion.com/v1/oauth/token"

# payload = {"grant_type": "\"authorization_code\""}
# headers = {
#     "accept": "application/json",
#     "content-type": "application/json"
# }

# response = requests.post(url, json=payload, headers=headers)

# print(response.text)


url = "https://api.notion.com/v1/blocks/70b995c50d6341c7a4c8b56ec7e6ec77/children"

headers = {
    "accept": "application/json",
    "Notion-Version": "2022-06-28",
    "Authorization": "Bearer secret_X5qNZfpVbfaJkNYvS6zd6XFnvnfXuRnzco6SHgg1SmM"}
""" 
response = requests.get(url, headers=headers)

print(response.text)
 """

data = {
    "children": [
        {
            "object": "block",
            "type": "heading_2",
            "heading_2": {
                "rich_text": [{"type": "text", "text": {"content": "Lacinato kale"}}]
            }
        },
        {
            "object": "block",
            "type": "paragraph",
            "paragraph": {
                "rich_text": [
                    {
                        "type": "text",
                        "text": {
                            "content": "Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",
                            "link": {"url": "https://en.wikipedia.org/wiki/Lacinato_kale"}
                        }
                    }
                ]
            }
        }
    ]
}

response = requests.patch(url, headers=headers, json=data)
print(response.text)
