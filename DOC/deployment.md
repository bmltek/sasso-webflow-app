# Deployment Guide

## Prerequisites

### Required Tools
- Azure CLI
- kubectl
- Docker
- Helm (version 3.x)
- Azure DevOps CLI

### Required Access
- Azure subscription with admin access
- Azure DevOps organization access
- Kubernetes cluster access
- Container registry access

## Infrastructure Setup

### Azure Resources
1. **Resource Group**
   ```bash
   az group create --name sasso-dev-rg --location eastus
   ```

2. **Azure Container Registry**
   ```bash
   az acr create --resource-group sasso-dev-rg \
                 --name sassoacruhosmrg6 \
                 --sku Basic \
                 --admin-enabled true
   ```

3. **Azure Kubernetes Service**
   ```bash
   az aks create --resource-group sasso-dev-rg \
                 --name sasso-dev-aks \
                 --node-count 2 \
                 --enable-addons monitoring \
                 --generate-ssh-keys
   ```

### Azure DevOps Setup

1. **Service Connections**
   - Create ACR service connection (ACR.sasso-webflow)
   - Create Azure subscription connection (AZURE_SUBSCRIPTION)
   - Create Kubernetes service connection (KUBERNETES-CONNECTION)

2. **Variable Groups**
   - Create AKS-Variables group with required variables
   - Configure pipeline variables

## Deployment Process

### 1. Code Analysis Stage
```yaml
- template: stages/code-analysis.yaml
  parameters:
    sonarProjectKey: 'princemike05_Sasso-Webflow'
    sonarOrganization: 'princemike05'
```

### 2. Build Stage
```yaml
- template: stages/build.yaml
  parameters:
    acrName: $(ACR_NAME)
```

### 3. Deploy Stage
```yaml
- template: stages/deploy.yaml
  parameters:
    resourceGroup: 'sasso-dev-rg'
    aksCluster: 'sasso-dev-aks'
    acrName: $(ACR_NAME)
```

## Manual Deployment Steps

### 1. Build and Push Images
```bash
# Frontend
docker build -t sassoacruhosmrg6.azurecr.io/frontend:latest ./frontend
docker push sassoacruhosmrg6.azurecr.io/frontend:latest

# Analytics Service
docker build -t sassoacruhosmrg6.azurecr.io/analytics-service:latest ./services/analytics
docker push sassoacruhosmrg6.azurecr.io/analytics-service:latest

# Metrics Service
docker build -t sassoacruhosmrg6.azurecr.io/metrics-service:latest ./services/metrics
docker push sassoacruhosmrg6.azurecr.io/metrics-service:latest

# User Service
docker build -t sassoacruhosmrg6.azurecr.io/user-service:latest ./services/user-management
docker push sassoacruhosmrg6.azurecr.io/user-service:latest
```

### 2. Deploy to Kubernetes
```bash
# Get AKS credentials
az aks get-credentials --resource-group sasso-dev-rg --name sasso-dev-aks

# Create namespace
kubectl create namespace sasso-webflow

# Apply configurations
kubectl apply -f kubernetes/config.yaml -n sasso-webflow
kubectl apply -f kubernetes/services.yaml -n sasso-webflow
kubectl apply -f kubernetes/metrics-service.yaml -n sasso-webflow
kubectl apply -f kubernetes/user-deployment.yaml -n sasso-webflow
kubectl apply -f kubernetes/frontend-deployment.yaml -n sasso-webflow
kubectl apply -f kubernetes/hpa.yaml -n sasso-webflow
```

## Verification

### Check Deployment Status
```bash
# Check pods
kubectl get pods -n sasso-webflow

# Check services
kubectl get services -n sasso-webflow

# Check deployments
kubectl get deployments -n sasso-webflow
```

### Verify Services
```bash
# Frontend
curl http://<frontend-service-ip>:80

# Analytics Service
curl http://<analytics-service-ip>:4001/health

# Metrics Service
curl http://<metrics-service-ip>:4003/health

# User Service
curl http://<user-service-ip>:4002/health
```

## Rollback Procedures

### Rollback Deployment
```bash
# Rollback specific deployment
kubectl rollout undo deployment/<deployment-name> -n sasso-webflow

# Check rollout status
kubectl rollout status deployment/<deployment-name> -n sasso-webflow
```

### Emergency Rollback
```bash
# Delete problematic resources
kubectl delete -f kubernetes/<problematic-file>.yaml -n sasso-webflow

# Reapply previous version
kubectl apply -f kubernetes/<previous-version>.yaml -n sasso-webflow
```

## Troubleshooting

### Common Issues
1. **Image Pull Errors**
   - Check ACR credentials
   - Verify image tags
   - Check network connectivity

2. **Pod Startup Issues**
   - Check pod logs
   - Verify environment variables
   - Check resource limits

3. **Service Connection Issues**
   - Verify service endpoints
   - Check network policies
   - Verify DNS resolution

### Logging
```bash
# Get pod logs
kubectl logs <pod-name> -n sasso-webflow

# Get deployment events
kubectl describe deployment/<deployment-name> -n sasso-webflow
``` 