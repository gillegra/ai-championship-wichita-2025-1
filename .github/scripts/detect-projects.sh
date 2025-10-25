#!/bin/bash

# Script to detect which projects have changed in the monorepo
# Looks for directories with package.json and checks git diff

set -e

echo "🔍 Detecting changed projects in monorepo..."

# If manually triggered with specific project, use that
if [[ -n "$MANUAL_PROJECT" ]]; then
  echo "📌 Manual deployment requested for: $MANUAL_PROJECT"
  echo "projects=[\"$MANUAL_PROJECT\"]" >> $GITHUB_OUTPUT
  exit 0
fi

# Find all directories with package.json (potential projects)
# Exclude node_modules, dist, build, and hidden directories
PROJECTS=$(find . -type f -name "package.json" \
  -not -path "*/node_modules/*" \
  -not -path "*/dist/*" \
  -not -path "*/build/*" \
  -not -path "*/.*/*" \
  | sed 's|/package.json||' \
  | sed 's|^\./||' \
  | grep -v "^$")

if [[ -z "$PROJECTS" ]]; then
  echo "⚠️  No projects found with package.json"
  echo "projects=[]" >> $GITHUB_OUTPUT
  exit 0
fi

echo "📦 Found potential projects:"
echo "$PROJECTS"

# Get changed files in last commit (or between commits for push events)
if [[ "$GITHUB_EVENT_NAME" == "push" ]]; then
  CHANGED_FILES=$(git diff --name-only HEAD~1 HEAD || git diff --name-only HEAD)
else
  CHANGED_FILES=$(git diff --name-only HEAD~1 HEAD)
fi

echo ""
echo "📝 Changed files:"
echo "$CHANGED_FILES"

# Determine which projects were affected
CHANGED_PROJECTS=()
while IFS= read -r project; do
  # Check if any changed files are within this project directory
  if echo "$CHANGED_FILES" | grep -q "^${project}/"; then
    echo "✅ Project '$project' has changes"
    CHANGED_PROJECTS+=("$project")
  fi
done <<< "$PROJECTS"

# Special case: if root files changed (like GitHub Actions), deploy all projects
if echo "$CHANGED_FILES" | grep -q "^\.github/workflows\|^scripts/"; then
  echo "⚙️  CI/CD configuration changed - deploying all projects"
  CHANGED_PROJECTS=()
  while IFS= read -r project; do
    CHANGED_PROJECTS+=("$project")
  done <<< "$PROJECTS"
fi

# Format as JSON array for GitHub Actions matrix
if [[ ${#CHANGED_PROJECTS[@]} -eq 0 ]]; then
  echo "ℹ️  No projects need deployment"
  echo "projects=[]" >> $GITHUB_OUTPUT
else
  echo ""
  echo "🚀 Projects to deploy:"
  printf '%s\n' "${CHANGED_PROJECTS[@]}"

  # Convert bash array to JSON array
  JSON_ARRAY=$(printf '%s\n' "${CHANGED_PROJECTS[@]}" | jq -R . | jq -s .)
  echo "projects=$JSON_ARRAY" >> $GITHUB_OUTPUT
fi
