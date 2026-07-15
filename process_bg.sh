#!/bin/bash
source .venv-rembg/bin/activate
mkdir -p public/3d-images-transparent
for file in public/3d-images/*.jpeg; do
  filename=$(basename -- "$file")
  name="${filename%.*}"
  rembg i "$file" "public/3d-images-transparent/$name.png"
done
