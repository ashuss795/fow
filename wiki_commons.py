import os
import re
import urllib.request
import urllib.parse
import json
import ssl
import time

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

mapping_rules = {
    "Chicken Biryani": "Chicken Biryani",
    
    "Cheese Naan": "Cheese Naan",
    "Butter Naan": "Butter Naan",
    "Garlic Naan": "Garlic Naan",
    "Lachha Paratha": "Lachha Paratha",
    "Tandoori Roti": "Tandoori Roti",
    
    "Gajar Ka Halwa": "Gajar halwa dessert",
    "Moong Dal Halwa": "Moong dal halwa",
    "Besan Ladoo": "Besan laddu",
    "Shahi Tukda": "Shahi tukra",
    
    "Mango Lassi": "Mango lassi",
    "Sweet Lassi": "Sweet lassi",
    "Masala Chai": "Masala chai cup",
    "Filter Coffee": "Indian filter coffee glass",
    "Jal Jeera": "Jal jeera glass",
    "Fresh Lime Soda": "Fresh lime soda or Nimbu Pani",
    "Thandai": "Thandai drink glass",
    "Rose Sherbet": "Rooh Afza syrup glass"
}

scraped_urls = {}

print("Querying Wikimedia Commons...")
for item, query in mapping_rules.items():
    enc_q = urllib.parse.quote(query)
    # gsrnamespace=6 restricts it specifically to 'File' attachments (images)
    url = f"https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch={enc_q}&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url&format=json"
    
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req, context=ctx)
        data = json.loads(res.read())
        pages = data.get("query", {}).get("pages", {})
        
        # Take the first image URL that is a jpg or jpeg
        for k, v in pages.items():
            if "imageinfo" in v and len(v["imageinfo"]) > 0:
                img_url = v["imageinfo"][0]["url"].replace("http://", "https://")
                if img_url.lower().endswith(".jpg") or img_url.lower().endswith(".jpeg") or img_url.lower().endswith(".png"):
                    scraped_urls[item] = img_url
                    print(f"Found {item}: {img_url}")
                    break
    except Exception as e:
        print(f"Failed {item}: {e}")
    time.sleep(0.5)

with open('d:\\fow\\js\\data.js', 'r', encoding='utf-8') as f:
    content = f.read()

def replacer(match):
    block = match.group(0)
    name_match = re.search(r'name:\s*"([^"]+)"', block)
    if name_match:
        name = name_match.group(1)
        if name in scraped_urls and scraped_urls[name]:
            new_img = scraped_urls[name]
            block = re.sub(r'image:\s*"[^"]+"', f'image: "{new_img}"', block)
    return block

new_content = re.sub(r'\{\s*id:.*?tags:\s*\[\]\s*\}', replacer, content, flags=re.DOTALL)

with open('d:\\fow\\js\\data.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Injected Wikipedia Commons images.")
