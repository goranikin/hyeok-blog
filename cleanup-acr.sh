#!/bin/bash
#
# Azure Container Registry Cleanup Script
# This script removes old untagged manifests and optionally old tags
# to save storage space in your ACR
#
# Usage:
#   ./cleanup-acr.sh <acr-name>
#
# Example:
#   ./cleanup-acr.sh hyeokblog
#

set -e

# Check if ACR name is provided
if [ -z "$1" ]; then
  echo "❌ Error: ACR name is required"
  echo "Usage: ./cleanup-acr.sh <acr-name>"
  echo "Example: ./cleanup-acr.sh hyeokblog"
  exit 1
fi

ACR_NAME="$1"

echo "========================================="
echo "Azure Container Registry Cleanup"
echo "========================================="
echo "ACR: $ACR_NAME"
echo ""

# Check if logged in to Azure
if ! az account show &> /dev/null; then
  echo "❌ Not logged in to Azure. Please run: az login"
  exit 1
fi

echo "✓ Logged in to Azure"
echo ""

# List all repositories
echo "📦 Repositories in ACR:"
REPOSITORIES=$(az acr repository list --name $ACR_NAME --output tsv)

if [ -z "$REPOSITORIES" ]; then
  echo "No repositories found"
  exit 0
fi

echo "$REPOSITORIES" | while read -r repo; do
  echo "  - $repo"
done
echo ""

# Cleanup untagged manifests for each repository
echo "🧹 Cleaning up untagged manifests..."
echo ""

TOTAL_DELETED=0

echo "$REPOSITORIES" | while read -r repo; do
  echo "Processing repository: $repo"

  # Get untagged manifests
  UNTAGGED=$(az acr repository show-manifests \
    --name $ACR_NAME \
    --repository $repo \
    --query "[?tags[0]==null].digest" \
    -o tsv 2>/dev/null || echo "")

  if [ -z "$UNTAGGED" ]; then
    echo "  ✓ No untagged manifests to delete"
  else
    COUNT=$(echo "$UNTAGGED" | wc -l)
    echo "  Found $COUNT untagged manifest(s)"

    echo "$UNTAGGED" | while read -r digest; do
      echo "  Deleting manifest: $digest"
      az acr repository delete \
        --name $ACR_NAME \
        --image $repo@$digest \
        --yes &> /dev/null
      TOTAL_DELETED=$((TOTAL_DELETED + 1))
    done

    echo "  ✓ Deleted $COUNT untagged manifest(s) from $repo"
  fi

  echo ""
done

echo "========================================="
echo "✅ Cleanup Complete!"
echo "========================================="
echo ""
echo "Summary:"
echo "  - Deleted untagged manifests"
echo "  - Kept all tagged images (including :latest)"
echo ""
echo "To see current storage usage:"
echo "  az acr show-usage --name $ACR_NAME --output table"
echo ""
echo "To see remaining images:"
echo "  az acr repository list --name $ACR_NAME --output table"
echo ""
