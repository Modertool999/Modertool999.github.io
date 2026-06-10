#!/usr/bin/env bash
set -euo pipefail

if ! command -v cwebp >/dev/null 2>&1; then
  echo "cwebp is required to build optimized collage assets." >&2
  exit 1
fi

if ! command -v sips >/dev/null 2>&1; then
  echo "sips is required to inspect collage image dimensions." >&2
  exit 1
fi

mkdir -p assets/collage

max_edge=1200

for src in assets/image*.jpg assets/image*.png assets/image*.webp; do
  [[ -e "$src" ]] || continue

  name="$(basename "$src")"
  out="assets/collage/${name%.*}.webp"

  if [[ -f "$out" && "$out" -nt "$src" ]]; then
    continue
  fi

  width="$(sips -g pixelWidth "$src" 2>/dev/null | awk '/pixelWidth/ { print $2 }')"
  height="$(sips -g pixelHeight "$src" 2>/dev/null | awk '/pixelHeight/ { print $2 }')"

  if [[ -z "$width" || -z "$height" ]]; then
    echo "Skipping unreadable image: $src" >&2
    continue
  fi

  resize_width=0
  resize_height="$max_edge"

  if (( width >= height )); then
    resize_width="$max_edge"
    resize_height=0
  fi

  cwebp -quiet -preset photo -q 78 -m 6 -mt -metadata none \
    -resize "$resize_width" "$resize_height" -resize_mode down_only \
    "$src" -o "$out"
done
