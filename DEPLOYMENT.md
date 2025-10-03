# Deployment Guide for Hyeok Blog

This guide provides step-by-step instructions for deploying your Next.js blog on AWS EC2 using Docker and Docker Compose.

## Prerequisites

- Ubuntu EC2 instance running
- SSH access to your EC2 instance
- Domain name (optional, but recommended for production)
- SSH key file (`hyeok-playground.pem`)

---

## Part 1: Local Setup

### 1. Test Docker Setup Locally (Optional but Recommended)

Before deploying to EC2, test your Docker setup locally:

```bash
# Build and run containers
docker-compose up --build

# Check if services are running
docker-compose ps

# View logs
docker-compose logs -f

# Access your blog at:
# - http://localhost (via Nginx)
# - http://localhost:3000 (direct Next.js)

# Stop containers
docker-compose down
```

### 2. Commit and Push Your Code

```bash
# Add all new files
git add .

# Commit changes
git commit -m "Add Docker deployment configuration"

# Push to GitHub
git push origin main
```

---

## Part 2: EC2 Server Setup

### 1. Connect to Your EC2 Instance

```bash
# Set correct permissions for your SSH key
chmod 400 hyeok-playground.pem

# Connect to EC2
ssh -i hyeok-playground.pem ubuntu@your-ec2-public-ip
```

### 2. Initial Server Setup

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install essential tools
sudo apt install -y curl git unzip build-essential
```

### 3. Install Docker

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add your user to docker group
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Start Docker service
sudo systemctl enable docker
sudo systemctl start docker

# Verify installation
docker --version
docker-compose --version
```

**Important:** Log out and log back in for docker group changes to take effect:

```bash
# Exit SSH
exit

# Reconnect
ssh -i hyeok-playground.pem ubuntu@your-ec2-public-ip
```

### 4. Configure EC2 Security Group

Make sure your EC2 Security Group allows inbound traffic on:
- **Port 22** (SSH)
- **Port 80** (HTTP)
- **Port 443** (HTTPS)

To configure this:
1. Go to AWS Console → EC2 → Security Groups
2. Select your instance's security group
3. Add inbound rules for ports 22, 80, and 443

### 5. Configure Firewall (UFW)

```bash
# Allow SSH, HTTP, and HTTPS
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

---

## Part 3: Deploy Your Application

### 1. Clone Your Repository

```bash
# Create app directory
mkdir -p ~/apps
cd ~/apps

# Clone your repository
git clone https://github.com/YOUR_USERNAME/hyeok-blog.git
cd hyeok-blog
```

### 2. Configure Environment Variables (if needed)

```bash
# Create .env file if you have environment variables
nano .env

# Add your environment variables
# NODE_ENV=production
# Add other variables as needed

# Save and exit (Ctrl+X, then Y, then Enter)
```

### 3. Deploy Using Docker Compose

```bash
# Build and start containers
docker-compose up -d --build

# Check if containers are running
docker-compose ps

# View logs
docker-compose logs -f

# Check specific service logs
docker-compose logs -f nextjs
docker-compose logs -f nginx
```

### 4. Verify Deployment

```bash
# Check if services are responding
curl http://localhost:3000  # Next.js app
curl http://localhost       # Nginx

# Check container health
docker ps

# If everything is running, access your blog at:
# http://your-ec2-public-ip
```

---

## Part 4: Domain Configuration (Optional)

### 1. Update Nginx Configuration

If you have a domain name, update the Nginx configuration:

```bash
# Edit Nginx config
nano ~/apps/hyeok-blog/nginx/conf.d/default.conf

# Change this line:
# server_name _;
# To:
# server_name yourdomain.com www.yourdomain.com;

# Restart Nginx
docker-compose restart nginx
```

### 2. Point Your Domain to EC2

1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Add an A record pointing to your EC2 public IP
3. Wait for DNS propagation (can take up to 48 hours, usually much faster)

### 3. Set Up SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot

# Stop nginx container temporarily
docker-compose stop nginx

# Obtain SSL certificate
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Create SSL directory
mkdir -p ~/apps/hyeok-blog/nginx/ssl

# Copy certificates
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ~/apps/hyeok-blog/nginx/ssl/
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ~/apps/hyeok-blog/nginx/ssl/
sudo chown -R $USER:$USER ~/apps/hyeok-blog/nginx/ssl/

# Update Nginx config to enable HTTPS
nano ~/apps/hyeok-blog/nginx/conf.d/default.conf
# Uncomment the HTTPS server block and HTTP redirect

# Restart containers
docker-compose up -d
```

### 4. Set Up Auto-Renewal for SSL

```bash
# Test renewal
sudo certbot renew --dry-run

# Set up cron job for auto-renewal
sudo crontab -e

# Add this line (runs twice daily):
0 0,12 * * * certbot renew --quiet && cp /etc/letsencrypt/live/yourdomain.com/*.pem ~/apps/hyeok-blog/nginx/ssl/ && docker-compose -f ~/apps/hyeok-blog/docker-compose.yml restart nginx
```

---

## Part 5: Deployment Management

### Using the Deploy Script

You can use the provided `deploy.sh` script for easier deployment:

```bash
# Run deployment script
./deploy.sh
```

### Manual Deployment Commands

```bash
# Pull latest changes
cd ~/apps/hyeok-blog
git pull origin main

# Rebuild and restart containers
docker-compose down
docker-compose up -d --build

# View logs
docker-compose logs -f
```

### Useful Docker Commands

```bash
# View running containers
docker ps

# View all containers (including stopped)
docker ps -a

# View logs
docker-compose logs -f
docker-compose logs -f nextjs
docker-compose logs -f nginx

# Restart services
docker-compose restart
docker-compose restart nextjs
docker-compose restart nginx

# Stop services
docker-compose stop

# Stop and remove containers
docker-compose down

# View resource usage
docker stats

# Execute command in container
docker exec -it hyeok-blog-app sh

# View container details
docker inspect hyeok-blog-app
```

### Cleanup Commands

```bash
# Remove unused containers
docker container prune

# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune

# Remove everything unused
docker system prune -a
```

---

## Part 6: Monitoring and Maintenance

### 1. View Logs

```bash
# Real-time logs
docker-compose logs -f

# Last 100 lines
docker-compose logs --tail=100

# Logs for specific service
docker-compose logs -f nextjs
```

### 2. Monitor Resources

```bash
# CPU and memory usage
docker stats

# Disk usage
df -h
docker system df
```

### 3. Update Application

```bash
cd ~/apps/hyeok-blog

# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

### 4. Backup Important Data

```bash
# Backup nginx logs
docker cp hyeok-blog-nginx:/var/log/nginx ./nginx-logs-backup

# Backup SSL certificates (if using Let's Encrypt)
sudo tar -czf letsencrypt-backup.tar.gz /etc/letsencrypt
```

---

## Part 7: Troubleshooting

### Container Won't Start

```bash
# Check logs
docker-compose logs

# Check if ports are in use
sudo netstat -tulpn | grep :80
sudo netstat -tulpn | grep :3000

# Remove and rebuild
docker-compose down
docker-compose up --build
```

### Nginx Configuration Error

```bash
# Test nginx config
docker exec hyeok-blog-nginx nginx -t

# Reload nginx
docker-compose restart nginx
```

### Application Not Accessible

```bash
# Check if containers are running
docker ps

# Check firewall
sudo ufw status

# Check EC2 Security Group in AWS Console

# Test locally
curl http://localhost:3000
curl http://localhost
```

### Out of Disk Space

```bash
# Check disk usage
df -h

# Clean up Docker
docker system prune -a --volumes

# Remove old images
docker image prune -a
```

---

## Part 8: CI/CD Setup (Optional - Advanced)

For automatic deployment when you push to GitHub, you can set up GitHub Actions:

1. Create `.github/workflows/deploy.yml`
2. Add EC2 credentials as GitHub Secrets
3. Configure automatic deployment on push to main branch

---

## Quick Reference

### Initial Setup (One-time)
```bash
# On EC2
sudo apt update && sudo apt upgrade -y
curl -fsSL https://get.docker.com -o get-docker.sh && sudo sh get-docker.sh
sudo usermod -aG docker $USER
# Log out and log back in
mkdir -p ~/apps && cd ~/apps
git clone https://github.com/YOUR_USERNAME/hyeok-blog.git
cd hyeok-blog
docker-compose up -d --build
```

### Regular Deployment
```bash
cd ~/apps/hyeok-blog
git pull origin main
docker-compose down
docker-compose up -d --build
```

### Check Status
```bash
docker-compose ps
docker-compose logs -f
```

---

## Support

If you encounter any issues:
1. Check the logs: `docker-compose logs -f`
2. Verify containers are running: `docker ps`
3. Check EC2 Security Group settings
4. Verify firewall rules: `sudo ufw status`

---

## Summary

Your deployment architecture:
- **Next.js App**: Running in Docker container on port 3000
- **Nginx**: Reverse proxy handling HTTP/HTTPS on ports 80/443
- **Docker Compose**: Managing both services with networking
- **EC2**: Ubuntu instance hosting everything

Access your blog at: `http://your-ec2-public-ip` or `https://yourdomain.com`

