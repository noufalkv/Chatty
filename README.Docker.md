# Chatty Application - Docker Setup

This repository contains Docker configurations for the Chatty social media application, including both frontend (React) and backend (Node.js/TypeScript) services.

## Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)
- Git

## Quick Start

### Production Environment

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd chatty
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start all services**
   ```bash
   docker-compose up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Redis: localhost:6379
   - MongoDB: Your cloud MongoDB instance

### Development Environment

1. **Start development services with hot reload**
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

2. **View logs**
   ```bash
   # All services
   docker-compose logs -f
   
   # Specific service
   docker-compose logs -f backend
   ```

## Services

### Frontend (React)
- **Port**: 3000 (development) / 80 (production)
- **Technology**: React 18, Redux Toolkit, SCSS
- **Production**: Nginx-served static files
- **Development**: Hot reload enabled

### Backend (Node.js/TypeScript)
- **Port**: 5000
- **Technology**: Express, TypeScript, Socket.IO
- **Features**: JWT auth, file uploads, real-time chat
- **Database**: Uses cloud MongoDB (configured via DATABASE_URL)

### Cache (Redis)
- **Port**: 6379
- **Version**: Redis 7
- **Default password**: redis123

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | Cloud MongoDB connection string | *required* |
| `REDIS_PASSWORD` | Redis password | redis123 |
| `JWT_TOKEN` | JWT secret token | *required* |
| `SECRET_KEY_ONE` | First secret key | *required* |
| `SECRET_KEY_TWO` | Second secret key | *required* |
| `CLIENT_URL` | Frontend URL | http://localhost:3000 |
| `API_URL` | Backend URL | http://localhost:5000 |
| `CLOUD_NAME` | Cloudinary name | *optional* |
| `CLOUD_API_KEY` | Cloudinary API key | *optional* |
| `CLOUD_API_SECRET` | Cloudinary secret | *optional* |

## Docker Commands

### Basic Operations
```bash
# Build and start all services
docker-compose up -d

# Stop all services
docker-compose down

# Rebuild services
docker-compose build --no-cache

# View running containers
docker ps

# View logs
docker-compose logs -f [service-name]
```

### Development Commands
```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up -d

# Rebuild development containers
docker-compose -f docker-compose.dev.yml build --no-cache

# Execute commands in running containers
docker-compose exec backend bash
docker-compose exec frontend sh
```

### Data Management
```bash
# Backup MongoDB data
docker-compose exec mongodb mongodump --out /backup

# Restore MongoDB data
docker-compose exec mongodb mongorestore /backup

# Clear all volumes (WARNING: Deletes all data)
docker-compose down -v
docker volume prune
```

## Health Checks

All services include health checks:
- **Frontend**: HTTP GET to /
- **Backend**: Custom health check script
- **MongoDB**: MongoDB ping command
- **Redis**: Redis ping command

Check service health:
```bash
docker-compose ps
docker inspect <container-name> | grep -i health
```

## Troubleshooting

### Common Issues

1. **Port conflicts**
   ```bash
   # Check port usage
   lsof -i :3000
   lsof -i :5000
   
   # Change ports in docker-compose.yml if needed
   ```

2. **Permission issues**
   ```bash
   # Fix file permissions
   sudo chown -R $USER:$USER .
   ```

3. **Database connection issues**
   ```bash
   # Check MongoDB logs
   docker-compose logs mongodb
   
   # Verify connection
   docker-compose exec mongodb mongosh --eval "db.adminCommand('ping')"
   ```

4. **Memory issues**
   ```bash
   # Check Docker resources
   docker system df
   docker system prune
   ```

### Logs and Debugging

```bash
# View all logs
docker-compose logs

# Follow specific service logs
docker-compose logs -f backend

# Execute shell in running container
docker-compose exec backend sh

# Check container resources
docker stats
```

## Production Deployment

For production deployment:

1. **Security**: Update all default passwords and secrets
2. **SSL**: Configure reverse proxy (Nginx/Traefik) with SSL
3. **Monitoring**: Add monitoring tools (Prometheus, Grafana)
4. **Backups**: Set up automated database backups
5. **Scaling**: Use Docker Swarm or Kubernetes for scaling

## File Structure

```
chatty/
├── docker-compose.yml          # Production configuration
├── docker-compose.dev.yml      # Development configuration
├── .env                        # Environment variables
├── chatty/                     # Frontend React app
│   ├── Dockerfile             # Production frontend image
│   ├── Dockerfile.dev         # Development frontend image
│   ├── nginx.conf            # Nginx configuration
│   └── .dockerignore         # Docker ignore file
├── chatty-backend/            # Backend Node.js app
│   ├── Dockerfile            # Production backend image
│   ├── Dockerfile.dev        # Development backend image
│   ├── healthcheck.js        # Health check script
│   └── .dockerignore         # Docker ignore file
└── README.Docker.md          # This file
```

## Support

For issues and questions:
1. Check the logs: `docker-compose logs`
2. Verify service health: `docker-compose ps`
3. Review this documentation
4. Open an issue in the repository