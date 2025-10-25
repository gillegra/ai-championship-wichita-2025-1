# CI/CD Setup Guide

Automated build and deployment for the ReSkill KS application using GitHub Actions and AWS S3 + CloudFront.

## Features

- **Automatic deployments**: Push to main branch triggers build and deploy
- **Skip CI commits**: Add `[skip-ci]` or `[no-cicd]` to commit messages to bypass deployment
- **Manual deployments**: Trigger deployments manually via GitHub Actions UI
- **S3 + CloudFront**: Fast, cheap static hosting with global CDN
- **Bun-powered builds**: Lightning-fast builds using Bun runtime

## Quick Start

### 1. Set up AWS credentials

#### Option A: Create IAM user (simpler)

1. Go to [AWS IAM Console](https://console.aws.amazon.com/iam/)
2. Click **Users** → **Create user**
3. User name: `github-actions-reskill-ks`
4. Click **Next** → **Attach policies directly**
5. Add these policies:
   - `AmazonS3FullAccess` (for S3 bucket management)
   - `CloudFrontFullAccess` (for CDN invalidation)
6. Click **Next** → **Create user**
7. Click on the new user → **Security credentials** tab
8. Click **Create access key** → Choose **Third-party service** → **Next**
9. **Save the Access Key ID and Secret Access Key** (shown only once)

#### Option B: Use existing AWS credentials

If you already have AWS credentials with S3/CloudFront permissions, you can use those.

### 2. Add secrets to GitHub

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

| Secret Name | Value | Required |
|-------------|-------|----------|
| `AWS_ACCESS_KEY_ID` | Your AWS access key ID | ✅ Yes |
| `AWS_SECRET_ACCESS_KEY` | Your AWS secret access key | ✅ Yes |
| `AWS_REGION` | AWS region (e.g., `us-east-1`, `us-east-2`) | Optional (defaults to us-east-1) |

### 3. Commit and push

The workflow is now active! It will trigger on:
- Push to `main` branch
- Manual trigger via GitHub Actions UI

## How It Works

### Automatic deployments

When you push to `main`:
1. **Check skip flag**: Checks commit message for `[skip-ci]` or `[no-cicd]` tags
2. **Build**: Runs `bun install` and `bun run build` at root level
3. **Deploy**: Uploads build output (dist/) to S3, invalidates CloudFront cache if configured

### Skip deployments

Add `[skip-ci]` or `[no-cicd]` anywhere in your commit message:

```bash
git commit -m "Update docs [skip-ci]"
```

### Manual deployments

1. Go to **Actions** tab in GitHub
2. Click **Build and Deploy** workflow
3. Click **Run workflow**
4. Click **Run workflow** to confirm

## Project Structure

The ReSkill KS application has:
- `package.json` at root with `bun run build` script
- Build output generated in `dist/` directory
- Multiple challenge pages under `src/pages/` (reskill, game, c3, c4)
- All challenges deploy together as a single SPA

Project structure:
```
/
├── package.json          # Root package.json with build script
├── src/
│   ├── pages/
│   │   ├── reskill/     # Challenge 1
│   │   ├── game/        # Challenge 2
│   │   ├── c3/          # Challenge 3
│   │   └── c4/          # Challenge 4
│   └── shared/          # Shared components
├── dist/                # Build output (generated)
└── .github/
    ├── workflows/
    │   └── deploy.yml
    └── scripts/
        └── deploy-to-aws.sh
```

## AWS Resources Created

The deployment creates:

- **S3 Bucket**: `reskill-ks-reskill-ks-{environment}` (default: dev)
  - Configured for static website hosting
  - Public read access for static files
  - Optimized cache headers
- **CloudFront Distribution** (optional, manual setup)
  - Global CDN for fast delivery
  - Auto-invalidation after deployments

### CloudFront Setup (Optional but Recommended)

To add CloudFront CDN to your deployment:

1. Deploy once to create the S3 bucket
2. Go to [CloudFront Console](https://console.aws.amazon.com/cloudfront/)
3. Click **Create distribution**
4. **Origin domain**: Select the S3 bucket created by deployment
5. **Origin access**: Choose **Origin access control** (recommended)
6. **Default cache behavior**: Keep defaults
7. **Settings**:
   - **Alternate domain names**: Add custom domain if you have one
   - **SSL certificate**: Use default CloudFront cert or add custom
8. Click **Create distribution**
9. Note the distribution ID
10. Add to GitHub Secrets as `CLOUDFRONT_DISTRIBUTION_ID_{PROJECT_NAME}` (optional - script auto-detects)

## Deployment URLs

After deployment, your site will be available at:

- **S3 website URL**: `http://reskill-ks-reskill-ks-dev.s3-website-{region}.amazonaws.com`
- **CloudFront URL** (if configured): `https://{distribution-id}.cloudfront.net`
- **Custom domain** (if configured): `https://yourdomain.com`

Check the GitHub Actions logs for exact URLs after each deployment.

## Troubleshooting

### Build fails with "command not found"

Make sure your root `package.json` has a `build` script:
```json
{
  "scripts": {
    "build": "tsc && vite build"
  }
}
```

### AWS credentials invalid

- Verify secrets are set correctly in GitHub (no extra spaces)
- Check IAM user has S3 and CloudFront permissions
- Confirm access key is still active in AWS IAM console

### Build directory not found

- Ensure `bun run build` creates a `dist/` directory
- Check build output in GitHub Actions logs
- Verify Vite config outputs to `dist/`

### S3 bucket creation fails

- Bucket names must be globally unique across all AWS accounts
- If bucket name is taken, modify the script or use a unique prefix
- Ensure AWS credentials have S3 creation permissions

## Cost Estimates

AWS costs for S3 + CloudFront hosting are typically very low:

- **S3 storage**: ~$0.023/GB/month
- **S3 requests**: ~$0.0004 per 1,000 requests
- **CloudFront data transfer**: First 1 TB/month free, then ~$0.085/GB
- **CloudFront requests**: ~$0.0075 per 10,000 requests

Example: A 50MB site with 10,000 visitors/month costs approximately $1-2/month.

## Advanced Configuration

### Deploy to different environments

Set environment via GitHub Actions variables:
```yaml
env:
  DEPLOY_ENV: production  # or 'dev', 'staging'
```

Bucket naming: `reskill-ks-{project}-{environment}`

### Custom domain setup

1. Register domain or use existing
2. Set up CloudFront distribution (see above)
3. Add domain to CloudFront alternate domain names
4. Create SSL certificate in AWS Certificate Manager (us-east-1 region)
5. Update Route53 or your DNS provider with CloudFront CNAME

## Scripts Reference

### `.github/scripts/deploy-to-aws.sh`
Deploys the built application to S3 and optionally invalidates CloudFront cache. Creates S3 bucket if it doesn't exist.

**Usage**:
```bash
./.github/scripts/deploy-to-aws.sh <project-name>
```

**Example**:
```bash
# Deploy with default settings
./.github/scripts/deploy-to-aws.sh "reskill-ks"

# Deploy to production environment
DEPLOY_ENV=production ./.github/scripts/deploy-to-aws.sh "reskill-ks"
```

**Environment variables**:
- `AWS_ACCESS_KEY_ID`: AWS access key (required)
- `AWS_SECRET_ACCESS_KEY`: AWS secret key (required)
- `AWS_REGION`: AWS region (default: us-east-1)
- `DEPLOY_ENV`: Environment name for bucket naming (default: dev)
