#!/bin/bash
# Downloads curated Unsplash placeholder imagery for the Pravin site.
# TEMPORARY images — every file here should be swapped for the client's own
# AI-refined product photography before launch. See public/images/CREDITS.md.
set -e
cd "$(dirname "$0")/../public/images"

dl() {
  local path="$1"
  local photoId="$2"
  local width="$3"
  echo "Downloading $path ..."
  curl -sL "https://images.unsplash.com/${photoId}?q=80&w=${width}&auto=format&fit=crop" -o "$path"
}

# Hero slider (full-bleed, large)
dl hero/hero-1.jpg photo-1635653713532-614ab79967fa 1920
dl hero/hero-2.jpg photo-1604030257097-28a4e530d773 1920
dl hero/hero-3.jpg photo-1630579083524-e3ac854edb46 1920
dl hero/hero-4.jpg photo-1583147247241-300cf7acf42a 1920

# About strip
dl about/workshop.jpg photo-1497219055242-93359eeed651 1400

# Product category cards
dl products/solid-wood-doors.jpg photo-1566653223195-e09604588c9f 1200
dl products/barn-doors.jpg photo-1635653713100-86c4bc6da035 1200
dl products/glass-french-doors.jpg photo-1777496385713-48d4d3740431 1200
dl products/interior-hdf-doors.jpg photo-1657146746877-ba5c3ee71367 1200
dl products/cupboard-cabinet-doors.jpg photo-1768578927302-0d85da43f34e 1200
dl products/live-edge-slabs.jpg photo-1782914701565-ab51d55e1479 1200
dl products/lumber-supply.jpg photo-1667689815944-9f72c0f59e74 1200

# Featured gallery
dl gallery/gallery-1.jpg photo-1511366837949-90f9fdaadf6b 1400
dl gallery/gallery-2.jpg photo-1720265017851-c0e2d2f9c81e 1400
dl gallery/gallery-3.jpg photo-1789799223024-777e6d9f3423 1400
dl gallery/gallery-4.jpg photo-1744329630135-06bb9d5e02a0 1400
dl gallery/gallery-5.jpg photo-1583095117095-adaeabc401ab 1400
dl gallery/gallery-6.jpg photo-1611600700192-d87eaeed4f81 1400

# Wood species swatches
dl wood/teak.jpg photo-1644931551533-02906718127f 700
dl wood/cedar.jpg photo-1546484396-fb3fc6f95f98 700
dl wood/mahogany.jpg photo-1583418007992-a8e33a92e7ad 700
dl wood/pitch-pine.jpg photo-1525947088131-b701cd0f6dc3 700
dl wood/greenheart.jpg photo-1736506159776-22ca388780fa 700
dl wood/appamat.jpg photo-1621295693450-080546d2ec8e 700
dl wood/olivier.jpg photo-1736506159893-22cca29b8018 700

# Atmosphere / contact section
dl atmosphere/timber-truck.jpg photo-1773205811618-3c5d29144832 1600

echo "Done."
