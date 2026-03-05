#!/bin/bash
# OmniOffice App Scaffold
# Run from C:\dev\omnioffice\ in PowerShell
# Creates the full app structure ready to run

set -e

echo "Scaffolding OmniOffice app..."

# Create Vite + React + TypeScript project
npm create vite@latest app -- --template react-ts
cd app

# Install core dependencies
npm install

# Install app dependencies
npm install \
  zustand \
  @supabase/supabase-js \
  yjs \
  y-websocket \
  react-router-dom \
  clsx

# Install dev dependencies
npm install -D \
  tailwindcss \
  postcss \
  autoprefixer \
  @types/node \
  electron \
  electron-builder \
  concurrently \
  wait-on \
  vite-plugin-electron \
  @capacitor/core \
  @capacitor/cli

# Init Tailwind
npx tailwindcss init -p

echo "✓ Dependencies installed"
echo "✓ Scaffold ready"
echo ""
echo "Next: copy the source files then run: npm run dev"
