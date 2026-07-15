import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Replacements
    new_content = content
    new_content = new_content.replace('bg-[#050505]', 'bg-background')
    new_content = re.sub(r'(?<!\w)text-white/(\d+)', r'text-foreground/\1', new_content)
    new_content = re.sub(r'(?<!\w)text-white(?!\w|-)', r'text-foreground', new_content)
    
    # borders
    new_content = re.sub(r'(?<!\w)border-white/(\d+)', r'border-foreground/\1', new_content)
    
    # bg-white/10 etc to bg-foreground/10
    # wait, bg-white/5 might be used for subtle backgrounds on dark mode, so in light mode it should be black/5.
    new_content = re.sub(r'(?<!\w)bg-white/(\d+)', r'bg-foreground/\1', new_content)
    
    # However, button text-white shouldn't be changed if it's explicitly bg-red-600.
    # We will just do a simpler approach:
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('components'):
    for file in files:
        if file.endswith('.tsx'):
            process_file(os.path.join(root, file))

for root, dirs, files in os.walk('app'):
    for file in files:
        if file.endswith('.tsx'):
            process_file(os.path.join(root, file))
