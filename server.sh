#!/usr/bin/bash

# Launch json server
npx json-server --watch data/db.json --port 8000

# If there is an error please do: export NODE_OPTIONS=--openssl-legacy-provider