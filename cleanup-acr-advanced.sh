#!/bin/bash
#
# Advanced Azure Container Registry Cleanup Script
# Removes old images based on retention policy
#
# Usage:
#   ./cleanup-acr-advanced.sh <acr-name> [options]
#
# Options:
#   --keep-tags N     Keep only the N most recent tags per repository (default: keep all)
#   --dry-run         Show what would be deleted without actually deleting
#   --repository R    Only clean specific repository
#
# Examples:
#   ./cleanup-acr-advanced.sh hyeokblog --dry-run
#   ./cleanup-acr-advanced.sh hyeokblog --keep-tags 5
#   ./cleanup-acr-advanced.sh hyeokblog --repository hyeok-blog --keep-tags 3
#

set -e

# Default values
ACR_NAME=""
KEEP_TAGS=""
DRY_RUN=false
SPECIFIC_REPO=""

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --keep-tags)
      KEEP_TAGS="$2"
      shift 2
      ;;
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --repository)
      SPECIFIC_REPO="$2"
      shift 2
      ;;
    *)
      if [ -z "$ACR_NAME" ]; then
        ACR_NAME="$1"
      else
        echo "❌ Unknown option: $1"
        exit 1
      fi
      shift
      ;;
  esac
done

# Validate ACR name
if [ -z "$ACR_NAME" ]; then
  echo "❌ Error: ACR name is required"
  echo ""
  echo "Usage: ./cleanup-acr-advanced.sh <acr-name> [options]"
  echo ""
  echo "Options:"
  echo "  --keep-tags N     Keep only the N most recent tags per repository"
  echo "  --dry-run         Show what would be deleted without actually deleting"
  echo "  --repository R    Only clean specific repository"
  echo ""
  echo "Examples:"
  echo "  ./cleanup-acr-advanced.sh hyeokblog --dry-run"
  echo "  ./cleanup-acr-advanced.sh hyeokblog --keep-tags 5"
  echo "  ./cleanup-acr-advanced.sh hyeokblog --repository hyeok-blog --keep-tags 3"
  exit 1
fi

echo "========================================="
echo "Advanced ACR Cleanup"
echo "========================================="
echo "ACR: $ACR_NAME"
[ "$DRY_RUN" = true ] && echo "Mode: DRY RUN (no actual deletion)"
[ -n "$KEEP_TAGS" ] && echo "Keep tags: $KEEP_TAGS most recent per repository"
[ -n "$SPECIFIC_REPO" ] && echo "Repository: $SPECIFIC_REPO only"
echo ""

# Check if logged in to Azure
if ! az account show &> /dev/null; then
  echo "❌ Not logged in to Azure. Please run: az login"
  exit 1
fi

# Get storage usage before cleanup
echo "📊 Current storage usage:"
az acr show-usage --name $ACR_NAME --output table
echo ""

# Get repositories to process
if [ -n "$SPECIFIC_REPO" ]; then
  REPOSITORIES="$SPECIFIC_REPO"
else
  REPOSITORIES=$(az acr repository list --name $ACR_NAME --output tsv)
fi

if [ -z "$REPOSITORIES" ]; then
  echo "No repositories found"
  exit 0
fi

echo "📦 Repositories to process:"
echo "$REPOSITORIES" | while read -r repo; do
  echo "  - $repo"
done
echo ""

# Cleanup function
cleanup_repository() {
  local repo=$1

  echo "─────────────────────────────────────"
  echo "Repository: $repo"
  echo "─────────────────────────────────────"

  # Cleanup untagged manifests
  echo "🧹 Cleaning untagged manifests..."
  UNTAGGED=$(az acr repository show-manifests \
    --name $ACR_NAME \
    --repository $repo \
    --query "[?tags[0]==null].digest" \
    -o tsv 2>/dev/null || echo "")

  if [ -z "$UNTAGGED" ]; then
    echo "  ✓ No untagged manifests"
  else
    COUNT=$(echo "$UNTAGGED" | wc -l)
    echo "  Found $COUNT untagged manifest(s)"

    if [ "$DRY_RUN" = true ]; then
      echo "  [DRY RUN] Would delete $COUNT untagged manifests"
    else
      echo "$UNTAGGED" | while read -r digest; do
        az acr repository delete \
          --name $ACR_NAME \
          --image $repo@$digest \
          --yes &> /dev/null
      done
      echo "  ✓ Deleted $COUNT untagged manifests"
    fi
  fi

  # Cleanup old tags if --keep-tags is specified
  if [ -n "$KEEP_TAGS" ]; then
    echo ""
    echo "🏷️  Managing tags (keeping $KEEP_TAGS most recent)..."

    # Get all tags sorted by creation time (newest first)
    ALL_TAGS=$(az acr repository show-tags \
      --name $ACR_NAME \
      --repository $repo \
      --orderby time_desc \
      --output tsv 2>/dev/null || echo "")

    if [ -z "$ALL_TAGS" ]; then
      echo "  ✓ No tags found"
    else
      TOTAL_TAGS=$(echo "$ALL_TAGS" | wc -l)
      echo "  Total tags: $TOTAL_TAGS"

      if [ "$TOTAL_TAGS" -le "$KEEP_TAGS" ]; then
        echo "  ✓ All tags within retention policy"
      else
        OLD_TAGS=$(echo "$ALL_TAGS" | tail -n +$((KEEP_TAGS + 1)))
        OLD_COUNT=$(echo "$OLD_TAGS" | wc -l)

        echo "  Keeping: $(echo "$ALL_TAGS" | head -n $KEEP_TAGS | tr '\n' ', ' | sed 's/,$//')"
        echo "  Deleting: $OLD_COUNT old tags"

        if [ "$DRY_RUN" = true ]; then
          echo "$OLD_TAGS" | while read -r tag; do
            echo "    [DRY RUN] Would delete tag: $tag"
          done
        else
          echo "$OLD_TAGS" | while read -r tag; do
            echo "    Deleting tag: $tag"
            az acr repository delete \
              --name $ACR_NAME \
              --image $repo:$tag \
              --yes &> /dev/null
          done
          echo "  ✓ Deleted $OLD_COUNT old tags"
        fi
      fi
    fi
  fi

  echo ""
}

# Process each repository
echo "$REPOSITORIES" | while read -r repo; do
  cleanup_repository "$repo"
done

echo "========================================="
if [ "$DRY_RUN" = true ]; then
  echo "✅ Dry Run Complete!"
  echo ""
  echo "This was a dry run. No changes were made."
  echo "Remove --dry-run flag to perform actual cleanup."
else
  echo "✅ Cleanup Complete!"
fi
echo "========================================="
echo ""

# Show storage usage after cleanup
if [ "$DRY_RUN" = false ]; then
  echo "📊 Storage usage after cleanup:"
  az acr show-usage --name $ACR_NAME --output table
  echo ""
fi

echo "To see remaining images:"
echo "  az acr repository list --name $ACR_NAME --output table"
echo ""
