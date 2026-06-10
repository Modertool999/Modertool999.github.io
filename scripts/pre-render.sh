#!/usr/bin/env bash
set -euo pipefail

scripts/update-compiled.sh
scripts/build-collage-assets.sh
