import json
with open('../data/metadata/libraries_registry.json', encoding='utf-8') as f:
    data = json.load(f)
total = sum(len(c['libraries']) for c in data['categories'])
print(f'Total: {total}')
for c in data['categories']:
    print(f'  {c["id"]}: {len(c["libraries"])}')
