#!/bin/bash
#
# Check Azure Container Registry Storage Usage
# Provides detailed breakdown and recommendations
#
# Usage:
#   ./check-acr-usage.sh <acr-name>
#

set -e

if [ -z "$1" ]; then
  echo "Usage: ./check-acr-usage.sh <acr-name>"
  exit 1
fi

ACR_NAME="$1"

echo "========================================="
echo "ACR Storage Analysis"
echo "========================================="
echo "ACR: $ACR_NAME"
echo ""

# Check if logged in
if ! az account show &> /dev/null; then
  echo "❌ Not logged in to Azure. Please run: az login"
  exit 1
fi

# Overall storage usage
echo "📊 Overall Storage Usage:"
az acr show-usage --name $ACR_NAME --output table
echo ""

# Get all repositories
REPOSITORIES=$(az acr repository list --name $ACR_NAME --output tsv)

if [ -z "$REPOSITORIES" ]; then
  echo "No repositories found"
  exit 0
fi

echo "📦 Repository Details:"
echo ""

TOTAL_TAGS=0
TOTAL_UNTAGGED=0

echo "$REPOSITORIES" | while read -r repo; do
  echo "─────────────────────────────────────"
  echo "Repository: $repo"

  # Count tags
  TAGS=$(az acr repository show-tags --name $ACR_NAME --repository $repo --output tsv 2>/dev/null || echo "")
  TAG_COUNT=$(echo "$TAGS" | grep -v '^$' | wc -l)
  TOTAL_TAGS=$((TOTAL_TAGS + TAG_COUNT))

  # Count untagged manifests
  UNTAGGED=$(az acr repository show-manifests \
    --name $ACR_NAME \
    --repository $repo \
    --query "[?tags[0]==null].digest" \
    -o tsv 2>/dev/null || echo "")
  UNTAGGED_COUNT=$(echo "$UNTAGGED" | grep -v '^$' | wc -l)
  TOTAL_UNTAGGED=$((TOTAL_UNTAGGED + UNTAGGED_COUNT))

  echo "  Tags: $TAG_COUNT"
  if [ -n "$TAGS" ] && [ "$TAG_COUNT" -gt 0 ]; then
    echo "  Latest tags:"
    echo "$TAGS" | head -n 5 | while read -r tag; do
      echo "    - $tag"
    done
    if [ "$TAG_COUNT" -gt 5 ]; then
      echo "    ... and $((TAG_COUNT - 5)) more"
    fi
  fi

  echo "  Untagged manifests: $UNTAGGED_COUNT"

  # Size estimation (approximate)
  MANIFEST_COUNT=$(az acr repository show-manifests \
    --name $ACR_NAME \
    --repository $repo \
    --query "length(@)" \
    -o tsv 2>/dev/null || echo "0")
  echo "  Total manifests: $MANIFEST_COUNT"
  echo ""
done

echo "========================================="
echo "Summary"
echo "========================================="
echo "Total repositories: $(echo "$REPOSITORIES" | wc -l)"
echo "Total tags: $TOTAL_TAGS"
echo "Total untagged manifests: $TOTAL_UNTAGGED"
echo ""

# Recommendations
echo "💡 Recommendations:"
echo ""

if [ "$TOTAL_UNTAGGED" -gt 0 ]; then
  echo "⚠️  Found $TOTAL_UNTAGGED untagged manifests"
  echo "   These are old image versions taking up space."
  echo "   → Run: ./cleanup-acr.sh $ACR_NAME"
  echo ""
fi

if [ "$TOTAL_TAGS" -gt 20 ]; then
  echo "⚠️  Found $TOTAL_TAGS tags across all repositories"
  echo "   Consider keeping only recent tags to save space."
  echo "   → Run: ./cleanup-acr-advanced.sh $ACR_NAME --keep-tags 5 --dry-run"
  echo ""
fi

# Check if using only :latest
ONLY_LATEST=true
echo "$REPOSITORIES" | while read -r repo; do
  TAGS=$(az acr repository show-tags --name $ACR_NAME --repository $repo --output tsv 2>/dev/null || echo "")
  NON_LATEST=$(echo "$TAGS" | grep -v '^latest$' | grep -v '^$' | wc -l)
  if [ "$NON_LATEST" -gt 0 ]; then
    ONLY_LATEST=false
    break
  fi
done

if [ "$ONLY_LATEST" = true ]; then
  echo "✅ Using only :latest tags (good practice)"
  echo "   Regular cleanup of untagged manifests is recommended."
  echo ""
fi

echo "To clean up now:"
echo "  Basic cleanup:    ./cleanup-acr.sh $ACR_NAME"
echo "  Preview changes:  ./cleanup-acr-advanced.sh $ACR_NAME --dry-run"
echo "  Keep 5 tags:      ./cleanup-acr-advanced.sh $ACR_NAME --keep-tags 5"
echo ""
