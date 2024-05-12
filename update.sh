#!/bin/bash
cd detroit-event-map
git pull
docker-compose down && docker-compose pull && docker-compose up -d