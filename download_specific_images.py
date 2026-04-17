import os
import re
import urllib.request
import urllib.parse
import time

images_dir = r"d:\fow\images"
os.makedirs(images_dir, exist_ok=True)

# Define exact prompts
prompts = {
    # Biryani
    "chicken_biryani_new": "A realistic high-quality professional food photography of Indian Chicken Biryani showing long-grain basmati rice and visible chicken pieces, resting on a dark moody stone table, dramatic lighting",
    
    # Breads
    "cheese_naan": "A realistic high-quality professional food photography of Indian stuffed Cheese Naan bread with visible melted cheese oozing, resting on a dark moody stone table, dramatic lighting.",
    "butter_naan": "A realistic high-quality professional food photography of Indian plain Butter Naan bread with glossy butter coating, resting on a dark moody stone table, dramatic lighting.",
    "garlic_naan": "A realistic high-quality professional food photography of Indian Garlic Naan bread topped with visible garlic and green herbs, resting on a dark moody stone table, dramatic lighting.",
    "lachha_paratha": "A realistic high-quality professional food photography of Indian Lachha Paratha bread showing layered flaky spiral texture, resting on a dark moody stone table, dramatic lighting.",
    "tandoori_roti": "A realistic high-quality professional food photography of Indian Tandoori Roti bread, dry slightly charred rustic texture, resting on a dark moody stone table, dramatic lighting.",
    
    # Desserts
    "gajar_ka_halwa": "A realistic high-quality professional food photography of Indian Gajar Ka Halwa grated reddish-orange aromatic carrot dessert with nuts, resting on a dark moody stone table, dramatic lighting.",
    "moong_dal_halwa": "A realistic high-quality professional food photography of Indian Moong Dal Halwa, grainy yellow rich pudding paste, resting on a dark moody stone table, dramatic lighting.",
    "besan_laddoo": "A realistic high-quality professional food photography of Indian Besan Laddoo round yellow ball sweets with dry fruit garnish, resting on a dark moody stone table, dramatic lighting.",
    "shahi_tukda": "A realistic high-quality professional food photography of Indian Shahi Tukda sweet bread dessert with rabri milk and nuts visible, resting on a dark moody stone table, dramatic lighting.",
    
    # Beverages
    "mango_lassi": "A realistic high-quality professional food photography of Indian Mango Lassi thick yellow sweet drink in a glass, resting on a dark moody stone table, dramatic lighting.",
    "sweet_lassi": "A realistic high-quality professional food photography of Indian Sweet Lassi white creamy drink in a glass, resting on a dark moody stone table, dramatic lighting.",
    "masala_chai": "A realistic high-quality professional food photography of hot brown Indian Masala Chai tea in a cup with scattered spices, resting on a dark moody stone table, dramatic lighting.",
    "filter_coffee": "A realistic high-quality professional food photography of Indian Filter Coffee dark colored with frothy top milky, resting on a dark moody stone table, dramatic lighting.",
    "jal_jeera": "A realistic high-quality professional food photography of Indian Jal Jeera greenish spiced drink liquid in a glass with mint, resting on a dark moody stone table, dramatic lighting.",
    "lime_soda": "A realistic high-quality professional food photography of Fresh Lime Soda transparent fizzy drink with lemon slices bubbles, dark moody stone table, dramatic lighting.",
    "thandai": "A realistic high-quality professional food photography of Indian Thandai creamy off-white drink with pistachio nuts and saffron spices, resting on a dark moody stone table, dramatic lighting.",
    "rose_sherbet": "A realistic high-quality professional food photography of Indian Rose Sherbet pink red colored sweet bright liquid drink, resting on a dark moody stone table, dramatic lighting."
}

def download_image(name, prompt_text):
    filename = os.path.join(images_dir, f"{name}.png")
    if os.path.exists(filename):
        return filename
        
    encoded_prompt = urllib.parse.quote(prompt_text)
    url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?width=600&height=400&nologo=true"
    
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req) as response:
            with open(filename, 'wb') as out_file:
                out_file.write(response.read())
        print(f"Downloaded {name}.png")
    except Exception as e:
        print(f"Failed to download {name}: {e}")
    time.sleep(1) # Be nice
    return filename

for k, v in prompts.items():
    download_image(k, v)


# Now update data.js to map these highly specific items
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
        if name in mapping_rules:
            new_img = f"images/{mapping_rules[name]}.png"
            block = re.sub(r'image:\s*"[^"]+"', f'image: "{new_img}"', block)
    return block

new_content = re.sub(r'\{\s*id:.*?tags:\s*\[\]\s*\}', replacer, content, flags=re.DOTALL)

with open('d:\\fow\\js\\data.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Exact image replacements complete.")
