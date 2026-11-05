import re
content = open(r'd:\py-project\ihangzhou-helper\js\app.js', 'r', encoding='utf-8').read()
# Check each new category content
for cat_id in ['vehicle', 'life', 'edu', 'travel']:
    idx = content.find(f'id: "{cat_id}"')
    if idx < 0:
        print(f'{cat_id}: NOT FOUND')
        continue
    items_start = content.find('items: [', idx)
    # find matching ]
    depth = 1
    i = items_start + 8
    while i < len(content) and depth > 0:
        if content[i] == '[': depth += 1
        elif content[i] == ']': depth -= 1
        i += 1
    block = content[items_start:i]
    items = re.findall(r'name:\s*"([^"]+)"', block)
    print(f'{cat_id} ({len(items)} items): {items[:15]}')
    print()
