#!/bin/bash

#npx testmo automation:resources:add-field --name git --type string --value ${BITBUCKET_COMMIT:0:7} --resources resources.json
#npx testmo automation:resources:add-link --name build--url $BUILD_URL --resources resources.json

# Run automated tests and report results to Testmo
export TESTMO_TOKEN="testmo_api_eyJpdiI6IndGK0N2N2ZFbEZ4ZkF2YlJDN2lSUmc9PSIsInZhbHVlIjoiNzZBRkVkNDlRNVR2Q0Y5STFHQThGQnZaQnJlTlMxa2VvWnJoY3ZNZUM4Yz0iLCJtYWMiOiI3YTBlYjIyMzRiNjNiYzM3NWZlMzU1NDI3NzczMjU1NzY0Zjc5MzNmNmRkMDM3MjQyZWIwMTg0ZGExNDY2MTY3IiwidGFnIjoiIn0="
TESTMO_URL="https://falp.testmo.net"
npx testmo automation:run:submit \
    --instance "$TESTMO_URL" \
    --project-id 13 \
    --name "Test run" \
    --source "API" \
    --results reports/*.xml \
    -- npm run test:e2e -- --verbose