# Azure Container Registry (ACR) Cleanup Guide

## Why Clean Up ACR?

Your ACR stores Docker images, including:
- **Tagged images** (like `hyeok-blog:latest`)
- **Untagged manifests** (old versions that are no longer referenced)
- **Image layers** (the actual file data)

Every time you push a new image with `:latest` tag, the old image becomes untagged but the layers remain in storage. Over time, this accumulates and costs money.

---

## Current Usage

Check your current ACR storage:

```bash
az acr show-usage --name <your-acr-name> --output table
```

You're currently at **2.24 GiB / 10 GiB** (22% used) - not critical but will grow over time.

---

## Cleanup Options

### **Option 1: Basic Cleanup (Recommended)**

**What it does:**
- Removes untagged manifests (old images no longer referenced)
- Keeps all tagged images (including `:latest`)
- Safe - won't break anything

**Usage:**

```bash
# Login to Azure
az login

# Run cleanup
./cleanup-acr.sh <your-acr-name>

# Example
./cleanup-acr.sh hyeokblog
```

**When to use:** Monthly or when storage usage is high.

---

### **Option 2: Advanced Cleanup**

**What it does:**
- Everything in Option 1
- Plus: Can keep only the N most recent tags per repository
- Plus: Dry run mode to preview changes

**Usage:**

```bash
# Dry run (preview only, no deletion)
./cleanup-acr-advanced.sh <your-acr-name> --dry-run

# Keep only 5 most recent tags per repository
./cleanup-acr-advanced.sh <your-acr-name> --keep-tags 5

# Clean specific repository only
./cleanup-acr-advanced.sh <your-acr-name> --repository hyeok-blog

# Combination
./cleanup-acr-advanced.sh <your-acr-name> --repository hyeok-blog --keep-tags 3 --dry-run
```

**When to use:** When you have multiple tags (not just `:latest`) or want more control.

---

## Manual Cleanup Commands

### Check what's in your ACR

```bash
# Set your ACR name
ACR_NAME="your-acr-name"

# List all repositories
az acr repository list --name $ACR_NAME --output table

# List tags in a repository
az acr repository show-tags --name $ACR_NAME --repository hyeok-blog --output table

# List untagged manifests
az acr repository show-manifests \
  --name $ACR_NAME \
  --repository hyeok-blog \
  --query "[?tags[0]==null].digest" \
  -o table
```

### Delete specific image

```bash
# Delete by tag
az acr repository delete --name $ACR_NAME --image hyeok-blog:old-tag --yes

# Delete by digest (untagged)
az acr repository delete --name $ACR_NAME --image hyeok-blog@sha256:abc123... --yes

# Delete all untagged manifests in a repository
az acr repository show-manifests \
  --name $ACR_NAME \
  --repository hyeok-blog \
  --query "[?tags[0]==null].digest" \
  -o tsv | \
  xargs -I% az acr repository delete --name $ACR_NAME --image hyeok-blog@% --yes
```

---

## Automated Cleanup with GitHub Actions (Optional)

Add this to your workflow to auto-cleanup on each deployment:

```yaml
- name: "Cleanup old ACR images"
  run: |
    # Keep only untagged manifests from last 7 days
    az acr run --registry ${{ secrets.REGISTRY_LOGIN_SERVER }} \
      --cmd "acr purge \
        --filter 'hyeok-blog:.*' \
        --ago 7d \
        --untagged" \
      /dev/null
```

---

## ACR Retention Policies (Best Practice)

Set up automatic retention policies in Azure Portal:

1. Go to Azure Portal → Your ACR → Repositories
2. Click "Retention" (Preview)
3. Enable retention policy:
   - **Keep untagged manifests for:** 7 days
   - **Keep last N tags:** 10

This automatically deletes old images without manual intervention.

**Azure CLI:**

```bash
# Enable retention policy (requires Premium tier)
az acr config retention update \
  --registry $ACR_NAME \
  --status enabled \
  --days 7 \
  --type UntaggedManifests
```

---

## FAQ

### Q: Will cleanup break my deployed applications?

**A:** No. The cleanup scripts only delete:
- Untagged manifests (old versions not in use)
- Old tags (if you specify `--keep-tags`)

Your currently deployed images (tagged with `:latest`) are never deleted.

### Q: How often should I clean up?

**A:**
- **Basic cleanup:** Monthly or quarterly
- **Advanced cleanup:** When you have many old tags
- **Automatic retention:** Set it up once and forget it

### Q: What if I delete something by mistake?

**A:** If you delete a tag that's still in use, just redeploy:
```bash
# Trigger GitHub Actions to rebuild and push
git commit --allow-empty -m "Rebuild image"
git push origin main
```

### Q: Can I recover deleted images?

**A:** No, ACR deletions are permanent. Use `--dry-run` to preview before actual deletion.

---

## Storage Cost Reference

Azure ACR pricing (as of 2026):
- **Basic tier:** $0.167 per GiB/month (included: 10 GiB)
- **Standard tier:** $0.167 per GiB/month (included: 100 GiB)
- **Premium tier:** $0.167 per GiB/month (included: 500 GiB)

**Your current usage:** 2.24 GiB (within free tier)

---

## Recommended Cleanup Strategy

For your setup (blog + tofugrader):

1. **Now:** Run basic cleanup to remove accumulated untagged manifests
   ```bash
   ./cleanup-acr.sh <your-acr-name>
   ```

2. **Monthly:** Run basic cleanup again

3. **Future:** Set up ACR retention policy (if you upgrade to Premium tier)

4. **Monitor:** Check storage usage monthly
   ```bash
   az acr show-usage --name <your-acr-name> --output table
   ```

---

## Summary

✅ **Safe cleanup (recommended):**
```bash
./cleanup-acr.sh <your-acr-name>
```

✅ **Preview before cleanup:**
```bash
./cleanup-acr-advanced.sh <your-acr-name> --dry-run
```

✅ **Keep only recent tags:**
```bash
./cleanup-acr-advanced.sh <your-acr-name> --keep-tags 5
```

---

**Questions?** Check the Azure CLI reference:
https://learn.microsoft.com/en-us/cli/azure/acr
