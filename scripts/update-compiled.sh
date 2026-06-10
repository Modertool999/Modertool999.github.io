#!/usr/bin/env bash
set -euo pipefail

compiled_at="$(LC_TIME=C TZ=America/New_York date '+%a, %d %b %Y %H:%M:%S %z')"

printf '<div class="compiled-stamp">Last compiled: %s</div>\n' "$compiled_at" > _last-compiled.html
