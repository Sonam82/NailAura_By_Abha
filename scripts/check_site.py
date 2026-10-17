from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import re

root=Path(__file__).resolve().parents[1]
errors=[]
class Check(HTMLParser):
    def __init__(self,path):
        super().__init__();self.path=path;self.ids=set();self.links=[];self.h1=0;self.main=0
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='h1':self.h1+=1
        if tag=='main':self.main+=1
        if 'id' in a:
            if a['id'] in self.ids:errors.append(f'{self.path.name}: duplicate id {a["id"]}')
            self.ids.add(a['id'])
        if tag=='img' and not 'alt' in a:errors.append(f'{self.path.name}: missing image alt')
        for key in ['href','src']:
            if key in a:
                u=urlsplit(a[key])
                if not u.scheme and not u.netloc:
                    target=self.path.parent/unquote(u.path) if u.path else self.path
                    if not target.exists():errors.append(f'{self.path.name}: missing {a[key]}')
                    if u.fragment:self.links.append((target,u.fragment))

pages={}
for path in root.glob('*.html'):
    p=Check(path);p.feed(path.read_text(encoding='utf-8-sig'));pages[path]=p
    if p.main!=1:errors.append(f'{path.name}: expected one main')
    if path.name!='product.html' and p.h1!=1:errors.append(f'{path.name}: expected one h1')
for path,p in pages.items():
    for target,fragment in p.links:
        if target in pages and fragment not in pages[target].ids:errors.append(f'{path.name}: broken fragment {target.name}#{fragment}')
for asset in re.findall(r'url\([\'"]?([^\)\'"]+)',(root/'assets/css/styles.css').read_text(encoding='utf-8-sig')):
    if not (root/'assets/css'/asset).exists():errors.append(f'Missing CSS asset: {asset}')
if errors:
    print('\n'.join(errors));raise SystemExit(1)
print(f'PASS: {len(pages)} pages, local links, fragments, image alt text, unique IDs and CSS assets.')
