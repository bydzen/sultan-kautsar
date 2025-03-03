#!/bin/bash

printf "Deploying public/ to [sultan-kautsar] Cloudflare pages project...\n"
wrangler pages deploy public --project-name sultan-kautsar
