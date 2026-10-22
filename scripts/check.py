from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json,xml.etree.ElementTree as ET
ROOT=Path(__file__).resolve().parents[1]
errors=[]
class Page(HTMLParser):
 def __init__(self):super().__init__();self.tags=[];self.scripts=[];self.ld=False
 def handle_starttag(self,t,a):
  a=dict(a);self.tags.append((t,a))
  if t=='script' and a.get('type')=='application/ld+json':self.ld=True
 def handle_endtag(self,t):
  if t=='script':self.ld=False
 def handle_data(self,d):
  if self.ld:self.scripts.append(d)
pages={}
for file in ROOT.rglob('*.html'):
 if '.git' in file.parts:continue
 p=Page();p.feed(file.read_text(encoding='utf-8'));pages[file.resolve()]=p
 if sum(t=='h1' for t,a in p.tags)!=1:errors.append(f'{file}: H1')
 if not any(t=='meta' and a.get('name')=='description' and a.get('content') for t,a in p.tags):errors.append(f'{file}: description')
 for t,a in p.tags:
  if t=='img' and 'alt' not in a:errors.append(f'{file}: alt')
 for raw in p.scripts:json.loads(raw)
for file,p in pages.items():
 for tag,a in p.tags:
  for attr in ['href','src']:
   value=a.get(attr,'');u=urlsplit(value)
   if not value or u.scheme or u.netloc:continue
   dest=(ROOT/unquote(u.path).lstrip('/') if u.path.startswith('/') else file.parent/unquote(u.path)) if u.path else file
   if dest.is_dir():dest=dest/'index.html'
   if not dest.exists():errors.append(f'{file.name}: missing {value}')
   elif u.fragment and dest.resolve() in pages and u.fragment not in {x.get('id') for _,x in pages[dest.resolve()].tags}:errors.append(f'{file.name}: missing fragment {value}')
  if a.get('srcset'):
   for part in a['srcset'].split(','):
    target=part.strip().split(' ')[0]
    if not (file.parent/target).exists():errors.append(f'{file.name}: missing srcset {target}')
assert (ROOT/'CNAME').read_text().strip()=='orsaelektrik.com'
assert 'G-JCEXZLZX71' in (ROOT/'assets/js/config.js').read_text()
urls=ET.parse(ROOT/'sitemap.xml').findall('.//{*}loc')
for loc in urls:
 target=ROOT/urlsplit(loc.text).path.lstrip('/')
 if target.is_dir():target=target/'index.html'
 if not target.exists():errors.append('Sitemap: '+loc.text)
print(json.dumps({'html_pages':len(pages),'sitemap_urls':len(urls),'local_link_errors':errors,'CNAME':'preserved','analytics':'preserved'},ensure_ascii=False,indent=2))
raise SystemExit(bool(errors))
