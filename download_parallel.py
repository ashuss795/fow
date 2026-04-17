import os
import re
import urllib.request
import urllib.parse
from concurrent.futures import ThreadPoolExecutor, as_completed

images_dir = r"d:\fow\images"
os.makedirs(images_dir, exist_ok=True)

prompts = {
    "chicken_biryani_new": "macro food photography Indian Chicken Biryani basmati rice with chicken chunks, moody lighting",
    "cheese_naan": "macro food photography stuffed Cheese Naan bread melted cheese oozing, moody lighting",
    "butter_naan": "macro food photography plain Butter Naan bread glossy butter coating, moody lighting",
    "garlic_naan": "macro food photography Garlic Naan bread topped with garlic green herbs, moody lighting",
    "lachha_paratha": "macro food photography Indian Lachha Paratha bread layered flaky spiral texture, moody lighting",
    "tandoori_roti": "macro food photography Tandoori Roti bread dry charred rustic texture, moody lighting",
    
    "gajar_ka_halwa": "macro food photography Gajar Ka Halwa grated reddish-orange carrots dessert nuts, moody lighting",
    "moong_dal_halwa": "macro food photography Moong Dal Halwa grainy yellow rich pudding paste, moody lighting",
    "besan_laddoo": "macro food photography Besan Laddoo round yellow ball sweets dry fruit, moody lighting",
    "shahi_tukda": "macro food photography Shahi Tukda sweet bread dessert rabri milk nuts, moody lighting",
    
    "mango_lassi": "macro food photography Mango Lassi thick yellow sweet drink glass, moody lighting",
    "sweet_lassi": "macro food photography Sweet Lassi white creamy drink glass, moody lighting",
    "masala_chai": "macro food photography hot brown Masala Chai tea cup spices, moody lighting",
    "filter_coffee": "macro food photography Filter Coffee dark colored frothy top milky, moody lighting",
    "jal_jeera": "macro food photography Jal Jeera greenish spiced drink liquid glass mint, moody lighting",
    "lime_soda": "macro food photography Fresh Lime Soda transparent fizzy drink lemon slices bubbles, moody lighting",
    "thandai": "macro food photography Indian Thandai creamy off-white drink pistachio nuts saffron, moody lighting",
    "rose_sherbet": "macro food photography Rose Sherbet pink red colored sweet bright liquid drink, moody lighting"
}

def download_image(name, prompt_text):
    filename = os.path.join(images_dir, f"{name}.png")
    if os.path.exists(filename) and os.path.getsize(filename) > 10000:
        return name, True
        
    encoded = urllib.parse.quote(prompt_text)
    url = f"https://image.pollinations.ai/prompt/{encoded}?width=600&height=400&nologo=true"
    
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req, timeout=15) as response:
            data = response.read()
            if len(data) > 10000:
                with open(filename, 'wb') as f:
                    f.write(data)
                return name, True
    except Exception as e:
        print(f"Error {name}: {e}")
        pass
    return name, False

def parallel_download():
    results = {}
    with ThreadPoolExecutor(max_workers=6) as executor:
        futures = {executor.submit(download_image, k, v): k for k, v in prompts.items()}
        for future in as_completed(futures):
            name, success = future.result()
            print(f"{name}: {'SUCCESS' if success else 'FAILED'}")
            results[name] = success
    return results

print("Starting concurrent downloads...")
results = parallel_download()

mapping_rules = {
    "Chicken Biryani": "chicken_biryani_new",
    "Cheese Naan": "cheese_naan",
    "Butter Naan": "butter_naan",
    "Garlic Naan": "garlic_naan",
    "Lachha Paratha": "lachha_paratha",
    "Tandoori Roti": "tandoori_roti",
    "Gajar Ka Halwa": "gajar_ka_halwa",
    "Moong Dal Halwa": "moong_dal_halwa",
    "Besan Ladoo": "besan_laddoo",
    "Shahi Tukda": "shahi_tukda",
    "Mango Lassi": "mango_lassi",
    "Sweet Lassi": "sweet_lassi",
    "Masala Chai": "masala_chai",
    "Filter Coffee": "filter_coffee",
    "Jal Jeera": "jal_jeera",
    "Fresh Lime Soda": "lime_soda",
    "Thandai": "thandai",
    "Rose Sherbet": "rose_sherbet"
}

with open('d:\\fow\\js\\data.js', 'r', encoding='utf-8') as f:
    content = f.read()

def replacer(match):
    block = match.group(0)
    name_match = re.search(r'name:\s*"([^"]+)"', block)
    if name_match:
        name = name_match.group(1)
        if name in mapping_rules and results.get(mapping_rules[name]):
            new_img = f"images/{mapping_rules[name]}.png"
            block = re.sub(r'image:\s*"[^"]+"', f'image: "{new_img}"', block)
    return block

new_content = re.sub(r'\{\s*id:.*?tags:\s*\[\]\s*\}', replacer, content, flags=re.DOTALL)

with open('d:\\fow\\js\\data.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Updates injected.")
