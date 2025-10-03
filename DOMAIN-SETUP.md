# Domain Setup Guide

This guide explains how to configure your custom domain for your blog deployed with Docker Compose.

## Quick Setup (Automated)

### On EC2 Server:

```bash
cd ~/apps/hyeok-blog
./setup-domain.sh
```

The script will:
1. Ask for your domain name
2. Update Nginx configuration
3. Check DNS settings
4. Install SSL certificate (Let's Encrypt)
5. Configure HTTPS
6. Set up auto-renewal

---

## Manual Setup (Step-by-Step)

### Step 1: Configure DNS

Before deploying, point your domain to your EC2 instance:

**Option A: Using Route 53 (AWS)**

1. Go to Route 53 in AWS Console
2. Create/select your hosted zone
3. Create an A record:
   - Record name: (leave blank for root domain)
   - Type: A
   - Value: Your EC2 public IP (e.g., `54.180.150.19`)
   - TTL: 300

4. If you want `www` subdomain:
   - Record name: `www`
   - Type: A or CNAME
   - Value: Your EC2 public IP or root domain
   - TTL: 300

**Option B: Using Other Registrars (GoDaddy, Namecheap, etc.)**

1. Log in to your domain registrar
2. Find DNS management / DNS settings
3. Add an A record:
   - Host: `@` (or leave blank)
   - Type: A
   - Value: Your EC2 public IP
   - TTL: Automatic or 300 seconds

4. For `www` subdomain:
   - Host: `www`
   - Type: A
   - Value: Your EC2 public IP
   - TTL: Automatic or 300 seconds

**Verify DNS Propagation:**

```bash
# Check if DNS is working
dig yourdomain.com +short
# or
nslookup yourdomain.com

# Should return your EC2 IP address
```

DNS propagation can take anywhere from 5 minutes to 48 hours, but usually completes within 15-30 minutes.

---

### Step 2: Update Nginx Configuration

**Replace `yourdomain.com` with your actual domain:**

```bash
# Edit the Nginx config
nano ~/apps/hyeok-blog/nginx/conf.d/default.conf
```

**Change this line (around line 8):**
```nginx
server_name _;  # Replace with your domain name
```

**To:**
```nginx
server_name yourdomain.com www.yourdomain.com;
```

**Restart Nginx:**
```bash
docker-compose restart nginx
```

**Test your domain:**
```bash
curl http://yourdomain.com
# or visit in browser
```

---

### Step 3: Set Up SSL (HTTPS)

#### Install Certbot

```bash
sudo apt update
sudo apt install -y certbot
```

#### Obtain SSL Certificate

```bash
# Stop Nginx container temporarily (to free port 80)
cd ~/apps/hyeok-blog
docker-compose stop nginx

# Get certificate for your domain
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Follow the prompts:
# - Enter email address
# - Agree to Terms of Service
# - Certificate will be saved to /etc/letsencrypt/live/yourdomain.com/
```

#### Copy Certificates to Docker

```bash
# Create SSL directory
mkdir -p ~/apps/hyeok-blog/nginx/ssl

# Copy certificates
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ~/apps/hyeok-blog/nginx/ssl/
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ~/apps/hyeok-blog/nginx/ssl/

# Fix permissions
sudo chown -R $USER:$USER ~/apps/hyeok-blog/nginx/ssl/
```

#### Update Nginx for HTTPS

Edit your Nginx configuration:

```bash
nano ~/apps/hyeok-blog/nginx/conf.d/default.conf
```

Replace the entire content with:

```nginx
upstream nextjs_upstream {
    server nextjs:3000;
}

# HTTPS server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    client_max_body_size 10M;

    location / {
        proxy_pass http://nextjs_upstream;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    location /_next/static {
        proxy_pass http://nextjs_upstream;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, immutable, max-age=31536000";
    }

    location /_next/image {
        proxy_pass http://nextjs_upstream;
        proxy_cache_valid 200 24h;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com www.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

**Restart all services:**

```bash
docker-compose up -d
```

**Test HTTPS:**

Visit `https://yourdomain.com` in your browser. You should see a secure padlock icon.

---

### Step 4: Set Up Auto-Renewal

Let's Encrypt certificates expire after 90 days. Set up automatic renewal:

```bash
# Test renewal process
sudo certbot renew --dry-run

# Set up cron job for auto-renewal
sudo crontab -e

# Add this line (runs twice daily at midnight and noon):
0 0,12 * * * certbot renew --quiet --deploy-hook 'cp /etc/letsencrypt/live/yourdomain.com/*.pem /home/ubuntu/apps/hyeok-blog/nginx/ssl/ && docker-compose -f /home/ubuntu/apps/hyeok-blog/docker-compose.yml restart nginx'
```

---

## Troubleshooting

### DNS Not Resolving

```bash
# Check DNS propagation
dig yourdomain.com +short

# Check from different DNS servers
dig @8.8.8.8 yourdomain.com +short  # Google DNS
dig @1.1.1.1 yourdomain.com +short  # Cloudflare DNS

# If not working, wait longer for DNS propagation
```

### Certbot Certificate Error

**Error: Port 80 already in use**
```bash
# Make sure nginx container is stopped
docker-compose stop nginx
# Then try again
sudo certbot certonly --standalone -d yourdomain.com
```

**Error: DNS not pointing to server**
```bash
# Verify DNS is correct
dig yourdomain.com +short
# Should show your EC2 IP

# Wait for DNS propagation if recently changed
```

**Error: Rate limit reached**
```bash
# Let's Encrypt has rate limits
# Wait a few hours or use staging environment for testing:
sudo certbot certonly --standalone --staging -d yourdomain.com
```

### HTTPS Not Working

```bash
# Check if certificates exist
ls -la ~/apps/hyeok-blog/nginx/ssl/

# Check nginx logs
docker-compose logs nginx

# Test nginx configuration
docker exec hyeok-blog-nginx nginx -t

# Verify ports are open
sudo ufw status
# Make sure 443 is allowed

# Check EC2 Security Group (in AWS Console)
# Make sure port 443 is open
```

### Certificate Expired

```bash
# Manually renew
sudo certbot renew

# Copy new certificates
sudo cp /etc/letsencrypt/live/yourdomain.com/*.pem ~/apps/hyeok-blog/nginx/ssl/
sudo chown -R $USER:$USER ~/apps/hyeok-blog/nginx/ssl/

# Restart nginx
docker-compose restart nginx
```

---

## Quick Reference

### Check Certificate Expiration

```bash
echo | openssl s_client -servername yourdomain.com -connect yourdomain.com:443 2>/dev/null | openssl x509 -noout -dates
```

### Force Certificate Renewal

```bash
sudo certbot renew --force-renewal
sudo cp /etc/letsencrypt/live/yourdomain.com/*.pem ~/apps/hyeok-blog/nginx/ssl/
docker-compose restart nginx
```

### Test HTTPS Configuration

```bash
# Using curl
curl -I https://yourdomain.com

# Check SSL certificate
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com
```

### Verify Docker Compose Configuration

```bash
# Check if SSL volume is mounted
docker-compose config

# Verify nginx container has certificates
docker exec hyeok-blog-nginx ls -la /etc/nginx/ssl/
```

---

## Security Checklist

After setting up your domain:

- [ ] HTTPS is working (padlock icon in browser)
- [ ] HTTP redirects to HTTPS
- [ ] Certificate is valid (not expired)
- [ ] Auto-renewal is configured
- [ ] Port 443 is open in EC2 Security Group
- [ ] Firewall allows port 443 (UFW)
- [ ] Security headers are present (check with browser dev tools)
- [ ] `www` subdomain works (if configured)

---

## Summary

**Quick Setup:**
1. Configure DNS → Point domain to EC2 IP
2. Wait for DNS propagation (15-30 minutes)
3. Run `./setup-domain.sh` on EC2
4. Done! Visit `https://yourdomain.com`

**Manual Setup:**
1. Configure DNS
2. Update Nginx config with domain name
3. Get SSL certificate with Certbot
4. Copy certificates to Docker volume
5. Update Nginx config for HTTPS
6. Set up auto-renewal cron job

Your blog will be accessible at:
- `https://yourdomain.com` (secure)
- `http://yourdomain.com` (redirects to HTTPS)
- `https://www.yourdomain.com` (if configured)

