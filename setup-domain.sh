#!/bin/bash

# Domain Setup Script for Hyeok Blog
# This script helps you configure your domain and SSL

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "🌐 Domain Setup for Hyeok Blog"
echo "================================"
echo ""

# Ask for domain name
read -p "Enter your domain name (e.g., example.com): " DOMAIN

if [ -z "$DOMAIN" ]; then
    echo -e "${RED}Error: Domain name cannot be empty${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}Domain: $DOMAIN${NC}"
echo ""

# Ask if they want to include www subdomain
read -p "Do you want to include www.$DOMAIN? (y/n): " INCLUDE_WWW

if [[ "$INCLUDE_WWW" =~ ^[Yy]$ ]]; then
    SERVER_NAME="$DOMAIN www.$DOMAIN"
    CERTBOT_DOMAIN="-d $DOMAIN -d www.$DOMAIN"
else
    SERVER_NAME="$DOMAIN"
    CERTBOT_DOMAIN="-d $DOMAIN"
fi

echo ""
echo "📝 Step 1: Updating Nginx configuration..."

# Create updated Nginx config
cat > nginx/conf.d/default.conf << EOF
upstream nextjs_upstream {
    server nextjs:3000;
}

server {
    listen 80;
    listen [::]:80;
    server_name $SERVER_NAME;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Client body size limit
    client_max_body_size 10M;

    location / {
        proxy_pass http://nextjs_upstream;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        
        # Real IP forwarding
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Static files caching (Next.js static assets)
    location /_next/static {
        proxy_pass http://nextjs_upstream;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, immutable, max-age=31536000";
    }

    # Image optimization
    location /_next/image {
        proxy_pass http://nextjs_upstream;
        proxy_cache_valid 200 24h;
    }

    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
EOF

echo -e "${GREEN}✓ Nginx configuration updated${NC}"
echo ""

# Check if running on EC2 or local
if [ -f /etc/os-release ] && grep -q "Ubuntu" /etc/os-release; then
    echo "📋 Step 2: DNS Configuration"
    echo "--------------------------------"
    echo "Before proceeding with SSL, make sure your DNS is configured:"
    echo ""
    echo "1. Go to your domain registrar (GoDaddy, Namecheap, Route53, etc.)"
    echo "2. Add an A record:"
    echo "   - Type: A"
    echo "   - Name: @ (or leave blank for root domain)"
    echo "   - Value: $(curl -s ifconfig.me 2>/dev/null || echo "YOUR_EC2_PUBLIC_IP")"
    
    if [[ "$INCLUDE_WWW" =~ ^[Yy]$ ]]; then
        echo "3. Add another A record for www:"
        echo "   - Type: A"
        echo "   - Name: www"
        echo "   - Value: $(curl -s ifconfig.me 2>/dev/null || echo "YOUR_EC2_PUBLIC_IP")"
    fi
    
    echo ""
    echo "4. Wait for DNS propagation (usually 5-30 minutes)"
    echo "   Check status: dig $DOMAIN +short"
    echo ""
    
    read -p "Have you configured DNS? (y/n): " DNS_READY
    
    if [[ ! "$DNS_READY" =~ ^[Yy]$ ]]; then
        echo ""
        echo -e "${YELLOW}Please configure DNS first, then run:${NC}"
        echo "  docker-compose restart nginx"
        echo "  sudo certbot certonly --standalone $CERTBOT_DOMAIN"
        exit 0
    fi
    
    echo ""
    echo "🔐 Step 3: Setting up SSL with Let's Encrypt..."
    echo "------------------------------------------------"
    
    # Check if certbot is installed
    if ! command -v certbot &> /dev/null; then
        echo "Installing Certbot..."
        sudo apt update
        sudo apt install -y certbot
    fi
    
    # Stop nginx container to free port 80
    echo "Stopping Nginx container temporarily..."
    docker-compose stop nginx
    
    # Get SSL certificate
    echo "Obtaining SSL certificate..."
    sudo certbot certonly --standalone $CERTBOT_DOMAIN --non-interactive --agree-tos --register-unsafely-without-email
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ SSL certificate obtained${NC}"
        
        # Create SSL directory and copy certificates
        echo "Copying certificates..."
        mkdir -p nginx/ssl
        sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem nginx/ssl/
        sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem nginx/ssl/
        sudo chown -R $USER:$USER nginx/ssl/
        
        echo -e "${GREEN}✓ Certificates copied${NC}"
        
        # Update Nginx config with HTTPS
        echo "Enabling HTTPS configuration..."
        cat > nginx/conf.d/default.conf << EOF
upstream nextjs_upstream {
    server nextjs:3000;
}

# HTTPS server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name $SERVER_NAME;

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
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        
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
    server_name $SERVER_NAME;
    return 301 https://\$server_name\$request_uri;
}
EOF
        
        echo -e "${GREEN}✓ HTTPS configuration enabled${NC}"
        
        # Set up auto-renewal
        echo "Setting up SSL auto-renewal..."
        CRON_CMD="0 0,12 * * * certbot renew --quiet --deploy-hook 'cp /etc/letsencrypt/live/$DOMAIN/*.pem $PWD/nginx/ssl/ && docker-compose -f $PWD/docker-compose.yml restart nginx'"
        (crontab -l 2>/dev/null | grep -v "certbot renew"; echo "$CRON_CMD") | crontab -
        
        echo -e "${GREEN}✓ Auto-renewal configured${NC}"
        
        # Restart services
        echo "Restarting services..."
        docker-compose up -d
        
        echo ""
        echo -e "${GREEN}================================${NC}"
        echo -e "${GREEN}✓ Setup Complete! 🎉${NC}"
        echo -e "${GREEN}================================${NC}"
        echo ""
        echo "Your blog is now available at:"
        echo "  - https://$DOMAIN"
        if [[ "$INCLUDE_WWW" =~ ^[Yy]$ ]]; then
            echo "  - https://www.$DOMAIN"
        fi
        echo ""
        echo "SSL certificate will auto-renew before expiration."
        
    else
        echo -e "${RED}Failed to obtain SSL certificate${NC}"
        echo "Please check:"
        echo "1. DNS is properly configured and propagated"
        echo "2. Port 80 is accessible from the internet"
        echo "3. No other service is using port 80"
        docker-compose up -d
        exit 1
    fi
    
else
    # Running locally
    echo ""
    echo -e "${GREEN}✓ Configuration updated for local development${NC}"
    echo ""
    echo "Next steps on your EC2 server:"
    echo "1. Commit and push these changes"
    echo "2. Pull on EC2: git pull origin main"
    echo "3. Run this script on EC2 to set up SSL"
    echo ""
    echo "Or manually:"
    echo "  docker-compose restart nginx"
fi

