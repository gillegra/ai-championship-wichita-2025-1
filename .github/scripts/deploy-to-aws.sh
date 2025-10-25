#!/bin/bash

# Script to deploy a built project to AWS S3 + CloudFront
# Usage: ./deploy-to-aws.sh <project-name>

set -e

PROJECT_NAME="${1:-}"

if [[ -z "$PROJECT_NAME" ]]; then
  echo "❌ Error: Project name required"
  echo "Usage: ./deploy-to-aws.sh <project-name>"
  exit 1
fi

echo "🚀 Deploying $PROJECT_NAME to AWS..."

# Determine build output directory
# Try common patterns: dist, build, out, .output
BUILD_DIR=""
for dir in "dist" "build" "out" ".output"; do
  if [[ -d "$PROJECT_NAME/$dir" ]]; then
    BUILD_DIR="$PROJECT_NAME/$dir"
    echo "📁 Found build directory: $BUILD_DIR"
    break
  fi
done

if [[ -z "$BUILD_DIR" ]]; then
  echo "❌ Error: No build directory found (checked: dist, build, out, .output)"
  exit 1
fi

# Generate S3 bucket name from project name
# Format: reskill-ks-{project-name}-{environment}
# Sanitize project name: replace / and spaces with dashes, lowercase
SANITIZED_NAME=$(echo "$PROJECT_NAME" | tr '/' '-' | tr ' ' '-' | tr '[:upper:]' '[:lower:]')
ENVIRONMENT="${DEPLOY_ENV:-dev}"
BUCKET_NAME="reskill-ks-${SANITIZED_NAME}-${ENVIRONMENT}"

echo "🪣 Target S3 bucket: $BUCKET_NAME"

# Check if bucket exists, create if not
if ! aws s3 ls "s3://$BUCKET_NAME" 2>/dev/null; then
  echo "📦 Creating S3 bucket: $BUCKET_NAME"

  # Create bucket
  if [[ "$AWS_REGION" == "us-east-1" ]]; then
    aws s3 mb "s3://$BUCKET_NAME"
  else
    aws s3 mb "s3://$BUCKET_NAME" --region "$AWS_REGION"
  fi

  # Configure bucket for static website hosting
  aws s3 website "s3://$BUCKET_NAME" \
    --index-document index.html \
    --error-document index.html

  # Set bucket policy for public read access
  cat > /tmp/bucket-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
    }
  ]
}
EOF

  aws s3api put-bucket-policy \
    --bucket "$BUCKET_NAME" \
    --policy file:///tmp/bucket-policy.json

  echo "✅ Bucket created and configured"
else
  echo "✅ Bucket already exists"
fi

# Sync build directory to S3
echo "📤 Uploading files to S3..."
aws s3 sync "$BUILD_DIR" "s3://$BUCKET_NAME" \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "index.html" \
  --exclude "*.html"

# Upload HTML files with shorter cache (for SPA routing)
aws s3 sync "$BUILD_DIR" "s3://$BUCKET_NAME" \
  --cache-control "public, max-age=0, must-revalidate" \
  --exclude "*" \
  --include "*.html"

echo "✅ Files uploaded to S3"

# Get website URL
WEBSITE_URL="http://$BUCKET_NAME.s3-website-${AWS_REGION}.amazonaws.com"
echo ""
echo "🌐 Website URL: $WEBSITE_URL"

# Check if CloudFront distribution exists for this bucket
echo ""
echo "🔍 Checking for existing CloudFront distribution..."

DISTRIBUTION_ID=$(aws cloudfront list-distributions \
  --query "DistributionList.Items[?Origins.Items[?DomainName=='${BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com']].Id | [0]" \
  --output text 2>/dev/null || echo "")

if [[ -z "$DISTRIBUTION_ID" || "$DISTRIBUTION_ID" == "None" ]]; then
  echo "ℹ️  No CloudFront distribution found"
  echo "💡 To add CloudFront CDN:"
  echo "   1. Go to AWS Console > CloudFront"
  echo "   2. Create distribution with origin: $BUCKET_NAME.s3-website-${AWS_REGION}.amazonaws.com"
  echo "   3. Add distribution ID to GitHub Secrets as CLOUDFRONT_DISTRIBUTION_ID_${SANITIZED_NAME^^}"
else
  echo "☁️  Found CloudFront distribution: $DISTRIBUTION_ID"
  echo "🔄 Invalidating CloudFront cache..."

  INVALIDATION_ID=$(aws cloudfront create-invalidation \
    --distribution-id "$DISTRIBUTION_ID" \
    --paths "/*" \
    --query 'Invalidation.Id' \
    --output text)

  echo "✅ Cache invalidation started: $INVALIDATION_ID"

  # Get CloudFront domain
  CF_DOMAIN=$(aws cloudfront get-distribution \
    --id "$DISTRIBUTION_ID" \
    --query 'Distribution.DomainName' \
    --output text)

  echo "🌐 CloudFront URL: https://$CF_DOMAIN"
fi

echo ""
echo "✨ Deployment complete for $PROJECT_NAME!"
