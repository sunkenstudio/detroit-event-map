#!/bin/bash
cd detroit-event-map
git pull
npm run build
pm2 restart detroit-event-map