# Development Guide

## Environment Setup

### Prerequisites
- Node.js v20 or higher
- Docker
- Azure CLI
- kubectl
- Terraform

### Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
# Application
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://dbuser:dbpassword@dbhost:5432/dbname

# Authentication
JWT_SECRET=your-jwt-secret-key-here

# Azure
AZURE_SUBSCRIPTION_ID=your-subscription-id-here
AZURE_TENANT_ID=your-tenant-id-here
AZURE_CLIENT_ID=your-client-id-here
AZURE_CLIENT_SECRET=your-client-secret-here

# Kubernetes
KUBERNETES_NAMESPACE=development
```

## Development Workflow

### 1. Local Development
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Run tests:
   ```bash
   npm test
   ```

### 2. Docker Development
1. Build the development image:
   ```bash
   docker build -t app-dev -f Dockerfile.dev .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 -v $(pwd):/app app-dev
   ```

### 3. Kubernetes Development
1. Apply development configuration:
   ```bash
   kubectl apply -f k8s/dev/
   ```

2. Port forward services:
   ```bash
   kubectl port-forward svc/app-service 3000:3000 -n development
   ```

## Testing

### Unit Tests
```bash
npm run test:unit
```

### Integration Tests
```bash
npm run test:integration
```

### E2E Tests
```bash
npm run test:e2e
```

## Deployment

### Development
```bash
npm run deploy:dev
```

### Staging
```bash
npm run deploy:staging
```

### Production
```bash
npm run deploy:prod
```

## Monitoring

### Application Metrics
- Health check endpoint: `/health`
- Metrics endpoint: `/metrics`

### Logging
- Application logs: `kubectl logs -f deployment/app -n development`
- Container logs: `kubectl logs -f pod/app-xxx -n development`

## Troubleshooting

### Common Issues
1. Database Connection
   - Check database credentials
   - Verify network connectivity
   - Check database service status

2. Kubernetes Deployment
   - Check pod status: `kubectl get pods -n development`
   - View pod logs: `kubectl logs -f pod/xxx -n development`
   - Check service status: `kubectl get svc -n development`

3. Application Issues
   - Check application logs
   - Verify environment variables
   - Check service dependencies

## Best Practices

### Code Style
- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful commit messages

### Security
- Never commit sensitive data
- Use environment variables for secrets
- Follow security best practices

### Performance
- Optimize database queries
- Implement caching where appropriate
- Monitor resource usage

## Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Submit a pull request

## Resources

### Documentation
- [Project Wiki](https://wiki.example.com)
- [API Documentation](https://api.example.com/docs)
- [Architecture Overview](https://docs.example.com/architecture)

### Tools
- [Azure Portal](https://portal.azure.com)
- [Kubernetes Dashboard](https://k8s.example.com)
- [Monitoring Dashboard](https://monitoring.example.com)