# Docker Setup for Hyeok Blog

## Architecture Overview

```
Internet → Nginx (Port 80/443) → Next.js App (Port 3000)
```

## Services

### 1. Next.js Application (`nextjs`)
- **Container Name**: `hyeok-blog-app`
- **Port**: 3000
- **Image**: Built from local Dockerfile using Bun
- **Health Check**: Checks `/api/health` endpoint every 30 seconds

### 2. Nginx Reverse Proxy (`nginx`)
- **Container Name**: `hyeok-blog-nginx`
- **Ports**: 80 (HTTP), 443 (HTTPS)
- **Image**: `nginx:alpine`
- **Configuration**: Custom nginx.conf and default.conf
- **Features**:
  - Reverse proxy to Next.js
  - Gzip compression
  - Static file caching
  - Security headers

## Directory Structure

```
hyeok-blog/
├── docker-compose.yml          # Docker Compose configuration
├── Dockerfile                  # Next.js application build
├── .dockerignore              # Files to ignore in Docker build
├── deploy.sh                  # Deployment automation script
├── update.sh                  # Quick update script
├── nginx/
│   ├── nginx.conf            # Main Nginx configuration
│   └── conf.d/
│       └── default.conf      # Site-specific configuration
└── src/
    └── app/
        └── api/
            └── health/
                └── route.ts  # Health check endpoint
```

## Quick Commands

### Start Services
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f nextjs
docker-compose logs -f nginx
```

### Rebuild
```bash
docker-compose up -d --build
```

### Restart
```bash
docker-compose restart
```

### Check Status
```bash
docker-compose ps
docker stats
```

## Configuration Files

### docker-compose.yml
Defines two services (nextjs and nginx) with:
- Network configuration
- Port mappings
- Volume mounts
- Health checks
- Restart policies

### nginx/nginx.conf
Main Nginx configuration with:
- Worker process settings
- Gzip compression
- Logging configuration
- MIME types

### nginx/conf.d/default.conf
Site-specific configuration with:
- Upstream definition (pointing to Next.js)
- Reverse proxy settings
- Security headers
- Caching rules
- SSL configuration (commented out by default)

## Environment Variables

Add environment variables in a `.env` file in the project root:

```env
NODE_ENV=production
# Add other variables as needed
```

Docker Compose will automatically load this file.

## Networking

Services communicate through a custom bridge network (`blog-network`):
- Nginx can reach Next.js at `http://nextjs:3000`
- Containers can communicate using service names
- Isolated from host network for security

## Health Checks

### Next.js Health Check
- **Endpoint**: `/api/health`
- **Interval**: Every 30 seconds
- **Timeout**: 10 seconds
- **Retries**: 3 attempts

### Nginx Health Check
- **Command**: `nginx -t` (tests configuration)
- **Interval**: Every 30 seconds
- **Timeout**: 10 seconds
- **Retries**: 3 attempts

## Volumes

### Named Volumes
- `nginx-logs`: Stores Nginx access and error logs

### Bind Mounts
- `./nginx/nginx.conf` → `/etc/nginx/nginx.conf`
- `./nginx/conf.d` → `/etc/nginx/conf.d`
- `./nginx/ssl` → `/etc/nginx/ssl` (for SSL certificates)

## Security Considerations

1. **File Permissions**: Nginx configs are mounted as read-only (`:ro`)
2. **Security Headers**: X-Frame-Options, X-Content-Type-Options, X-XSS-Protection
3. **SSL/TLS**: Ready for HTTPS with Let's Encrypt
4. **Network Isolation**: Services run in isolated Docker network
5. **Health Checks**: Automatic container restart on failure

## Performance Optimizations

1. **Gzip Compression**: Enabled for text files
2. **Static File Caching**: Long cache times for `/_next/static`
3. **Image Optimization**: 24-hour cache for Next.js images
4. **Multi-stage Build**: Optimized Docker image size
5. **Standalone Output**: Minimal Next.js production bundle

## Troubleshooting

### Container Won't Start
```bash
# Check logs
docker-compose logs

# Check if ports are in use
sudo lsof -i :80
sudo lsof -i :3000

# Verify Docker is running
docker ps
```

### Nginx Configuration Error
```bash
# Test configuration
docker exec hyeok-blog-nginx nginx -t

# Reload configuration
docker-compose restart nginx
```

### Build Failures
```bash
# Clean build
docker-compose down
docker system prune -a
docker-compose up --build
```

### Health Check Failures
```bash
# Check health status
docker inspect hyeok-blog-app | grep -A 10 Health

# Test health endpoint manually
curl http://localhost:3000/api/health
```

## Maintenance

### Update Application
```bash
./update.sh
# OR manually:
# git pull
# docker-compose down
# docker-compose up -d --build
```

### View Resource Usage
```bash
docker stats
```

### Backup
```bash
# Backup Nginx logs
docker cp hyeok-blog-nginx:/var/log/nginx ./backup/nginx-logs

# Backup volumes
docker run --rm -v nginx-logs:/data -v $(pwd):/backup alpine tar czf /backup/nginx-logs.tar.gz /data
```

### Cleanup
```bash
# Remove stopped containers
docker container prune

# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune

# Full cleanup
docker system prune -a --volumes
```

## Production Checklist

- [ ] Set up domain name and DNS
- [ ] Configure SSL/HTTPS with Let's Encrypt
- [ ] Update `server_name` in nginx config
- [ ] Set up automatic SSL renewal
- [ ] Configure firewall (UFW)
- [ ] Configure EC2 Security Group
- [ ] Set up monitoring and logging
- [ ] Configure automatic backups
- [ ] Set up CI/CD pipeline (optional)
- [ ] Test health checks
- [ ] Load testing
- [ ] Set up error alerting

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Let's Encrypt](https://letsencrypt.org/)

