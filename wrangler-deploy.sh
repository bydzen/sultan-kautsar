#!/bin/bash

printf "Deploying public/ to [sultankautsar] Cloudflare pages project...\n"
wrangler pages deploy public --project-name sultankautsar
