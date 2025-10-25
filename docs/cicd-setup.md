# CI/CD Setup Guide

Automated build and deployment for the ReSkill KS monorepo using GitHub Actions and AWS S3 + CloudFront.

## Features

- **Smart monorepo detection**: Automatically detects which projects changed and deploys only those
- **Skip CI commits**: Add `[skip-ci]` or `[no-cicd]` to commit messages to bypass deployment
- **Manual deployments**: Trigger deployments manually via GitHub Actions UI
- **S3 + CloudFront**: Fast, cheap static hosting with global CDN
- **Parallel deployments**: Multiple projects deploy simultaneously

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
1. **Detection**: Scans git diff to find changed projects
2. **Build**: Runs `bun install` and `bun run build` for each project
3. **Deploy**: Uploads build output to S3, invalidates CloudFront cache

### Skip deployments

Add `[skip-ci]` or `[no-cicd]` anywhere in your commit message:

```bash
git commit -m "Update docs [skip-ci]"
```

### Manual deployments

1. Go to **Actions** tab in GitHub
2. Click **Build and Deploy** workflow
3. Click **Run workflow**
4. Optionally specify a single project to deploy
5. Click **Run workflow**

## Project Structure Requirements

Each project must have:
- `package.json` at project root
- `bun run build` script that creates output
- Build output in one of: `dist/`, `build/`, `out/`, `.output/`

Example monorepo structure:
```
/
├── frontend/              # Project 1
│   ├── package.json
│   └── dist/             # Build output
├── admin-dashboard/       # Project 2
│   ├── package.json
│   └── build/            # Build output
├── landing-page/          # Project 3
│   ├── package.json
│   └── out/              # Build output
└── .github/
    └── workflows/
        └── deploy.yml
```

## AWS Resources Created

For each project, the deployment creates:

- **S3 Bucket**: `reskill-ks-{project-name}-{environment}`
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

After deployment, your sites will be available at:

- **S3 website URL**: `http://reskill-ks-{project}-{env}.s3-website-{region}.amazonaws.com`
- **CloudFront URL** (if configured): `https://{distribution-id}.cloudfront.net`
- **Custom domain** (if configured): `https://yourdomain.com`

Check the GitHub Actions logs for exact URLs after deployment.

## Troubleshooting

### Build fails with "command not found"

Make sure your `package.json` has a `build` script:
```json
{
  "scripts": {
    "build": "vite build"  // or your build command
  }
}
```

### AWS credentials invalid

- Verify secrets are set correctly in GitHub (no extra spaces)
- Check IAM user has S3 and CloudFront permissions
- Confirm access key is still active in AWS IAM console

### Project not detected

- Ensure `package.json` exists in project directory
- Verify changes are in the project directory (not just root)
- Check GitHub Actions logs for "Detecting changed projects" output

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

### Multiple AWS accounts

To deploy different projects to different AWS accounts:
1. Create separate IAM users per account
2. Add account-specific secrets: `AWS_ACCESS_KEY_ID_PROJECT1`, etc.
3. Modify workflow to select secrets based on project name

## Scripts Reference

### `.github/scripts/detect-projects.sh`
Scans monorepo for projects (directories with `package.json`) and determines which changed based on git diff.

### `.github/scripts/deploy-to-aws.sh`
Deploys a built project to S3, optionally invalidates CloudFront cache. Creates bucket if doesn't exist.

**Usage**:
```bash
./.github/scripts/deploy-to-aws.sh <project-name>
```

**Environment variables**:
- `AWS_ACCESS_KEY_ID`: AWS access key
- `AWS_SECRET_ACCESS_KEY`: AWS secret key
- `AWS_REGION`: AWS region (default: us-east-1)
- `DEPLOY_ENV`: Environment name (default: dev)
