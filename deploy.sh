#!/bin/bash

# Function to display error messages and exit
error_exit() {
    echo "$1" 1>&2
    exit 1
}

# Check if running in GitHub Actions
if [ -n "$GITHUB_ACTIONS" ]; then
    # Use environment variables from GitHub Secrets
    echo "Running in GitHub Actions. Using environment variables from secrets."
else
    # Load environment variables from .env.local file for local testing
    if [ -f .env.local ]; then
        echo "Loading environment variables from .env.local."
        export $(grep -v '^#' .env.local | xargs)
    else
        error_exit ".env.local file not found. Please create it with the required variables for local testing."
    fi

    # Install dependencies and build the project locally
    echo "Installing dependencies..."
    npm install || error_exit "Failed to install dependencies."

    echo "Building css..."
    npm run css:build || error_exit "Failed to build css."

    echo "Building project..."
    npm run build || error_exit "Failed to build project."
fi

# Variables
S3_BUCKET_1="www.myfaceshape.pro"
S3_BUCKET_2="www.faceshape.my"
DIST_DIR="dist"

# Check if the dist directory exists
if [ ! -d "$DIST_DIR" ]; then
    error_exit "The $DIST_DIR directory does not exist. Please build the project first."
fi

# Sync the dist directory to the S3 buckets
echo "Deploying to $S3_BUCKET_1..."
aws s3 sync $DIST_DIR s3://$S3_BUCKET_1 --acl public-read || error_exit "Failed to deploy to $S3_BUCKET_1."

echo "Deploying to $S3_BUCKET_2..."
aws s3 sync $DIST_DIR s3://$S3_BUCKET_2 --acl public-read || error_exit "Failed to deploy to $S3_BUCKET_2."

# Purge Cloudflare cache for myfaceshape.pro
echo "Purging Cloudflare cache for myfaceshape.pro..."
response1=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID_MYFACESHAPE_PRO/purge_cache" \
     -H "X-Auth-Email: $CF_EMAIL" \
     -H "X-Auth-Key: $CF_API_KEY" \
     -H "Content-Type: application/json" \
     --data '{"purge_everything":true}')

# Check if the cache purge was successful
if [[ $(echo "$response1" | jq -r '.success') == "true" ]]; then
    echo "Cloudflare cache purged successfully for myfaceshape.pro."
else
    error_exit "Failed to purge Cloudflare cache for myfaceshape.pro. Response: $response1"
fi

# Purge Cloudflare cache for faceshape.my
echo "Purging Cloudflare cache for faceshape.my..."
response2=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID_FACESHAPE_MY/purge_cache" \
     -H "X-Auth-Email: $CF_EMAIL" \
     -H "X-Auth-Key: $CF_API_KEY" \
     -H "Content-Type: application/json" \
     --data '{"purge_everything":true}')

# Check if the cache purge was successful
if [[ $(echo "$response2" | jq -r '.success') == "true" ]]; then
    echo "Cloudflare cache purged successfully for faceshape.my."
else
    error_exit "Failed to purge Cloudflare cache for faceshape.my. Response: $response2"
fi

echo "Deployment completed successfully!"