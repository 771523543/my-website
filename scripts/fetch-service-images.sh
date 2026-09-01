#!/usr/bin/env bash
set -euo pipefail

# Script to download service images into public/images
# Run: ./scripts/fetch-service-images.sh

mkdir -p public/images

curl -L -o public/images/service-research.jpg "https://images.unsplash.com/photo-1521747116042-5a810fda9664?auto=format&fit=crop&w=1600&q=80"
curl -L -o public/images/service-presentation.jpg "https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=1600&q=80"
curl -L -o public/images/service-assignments.png "https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1600&q=80"
curl -L -o public/images/service-cv.jpg "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1600&q=80"
curl -L -o public/images/service-invitations.jpg "https://images.unsplash.com/photo-1505238680356-667803448bb6?auto=format&fit=crop&w=1600&q=80"
curl -L -o public/images/service-followup.jpg "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80"

echo "Downloaded service images to public/images/"
