# Operations Guide

## Infrastructure Overview

### Azure Resources
- Azure Kubernetes Service (AKS)
- Azure Container Registry (ACR)
- Azure Key Vault
- Azure Monitor
- Azure Log Analytics
- Azure Application Insights

### Kubernetes Resources
- Deployments
- Services
- ConfigMaps
- Secrets
- Ingress
- HorizontalPodAutoscaler
- PodDisruptionBudget

## Monitoring

### Application Monitoring
1. Azure Application Insights
   - Request rates
   - Response times
   - Error rates
   - Dependencies
   - Custom metrics

2. Log Analytics
   - Container logs
   - Node logs
   - System metrics
   - Custom queries

### Infrastructure Monitoring
1. Azure Monitor
   - Node health
   - Pod health
   - Resource usage
   - Network metrics

2. Kubernetes Dashboard
   - Cluster status
   - Resource utilization
   - Pod status
   - Service health

## Logging

### Application Logs
```bash
# View frontend logs
kubectl logs -f deployment/frontend -n sasso-webflow

# View service logs
kubectl logs -f deployment/analytics-service -n sasso-webflow
kubectl logs -f deployment/metrics-service -n sasso-webflow
kubectl logs -f deployment/user-service -n sasso-webflow
```

### System Logs
```bash
# View node logs
kubectl logs -f node/<node-name>

# View system logs
kubectl logs -f -n kube-system
```

## Scaling

### Manual Scaling
```bash
# Scale deployments
kubectl scale deployment frontend --replicas=3 -n sasso-webflow
kubectl scale deployment analytics-service --replicas=2 -n sasso-webflow
```

### Auto Scaling
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: frontend-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: frontend
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

## Backup and Recovery

### Database Backup
```bash
# Backup MongoDB
mongodump --uri="mongodb://localhost:27017" --out=/backup

# Restore MongoDB
mongorestore --uri="mongodb://localhost:27017" /backup
```

### Configuration Backup
```bash
# Backup Kubernetes resources
kubectl get all -n sasso-webflow -o yaml > backup.yaml

# Restore Kubernetes resources
kubectl apply -f backup.yaml
```

## Security

### Secret Management
```bash
# Create secrets
kubectl create secret generic app-secrets \
  --from-literal=JWT_SECRET=your-secret \
  --from-literal=DB_PASSWORD=your-password \
  -n sasso-webflow
```

### Network Policies
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: frontend-policy
spec:
  podSelector:
    matchLabels:
      app: frontend
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: ingress-nginx
    ports:
    - protocol: TCP
      port: 80
```

## Maintenance

### Node Maintenance
```bash
# Drain node
kubectl drain <node-name> --ignore-daemonsets

# Uncordon node
kubectl uncordon <node-name>
```

### Pod Eviction
```bash
# Evict pod
kubectl evict pod/<pod-name> -n sasso-webflow
```

## Troubleshooting

### Common Issues
1. Pod Crash
   ```bash
   # Check pod status
   kubectl describe pod/<pod-name> -n sasso-webflow
   
   # View logs
   kubectl logs <pod-name> -n sasso-webflow
   ```

2. Service Issues
   ```bash
   # Check service endpoints
   kubectl get endpoints <service-name> -n sasso-webflow
   
   # Check service logs
   kubectl logs -f deployment/<service-name> -n sasso-webflow
   ```

3. Network Issues
   ```bash
   # Check ingress status
   kubectl get ingress -n sasso-webflow
   
   # Check network policies
   kubectl get networkpolicies -n sasso-webflow
   ```

### Performance Issues
1. Resource Constraints
   ```bash
   # Check resource usage
   kubectl top nodes
   kubectl top pods -n sasso-webflow
   ```

2. Database Issues
   ```bash
   # Check MongoDB status
   kubectl exec -it <mongodb-pod> -- mongo --eval "db.serverStatus()"
   ```

## Disaster Recovery

### Cluster Recovery
1. Backup cluster state
2. Restore from backup
3. Verify services
4. Monitor metrics

### Data Recovery
1. Restore database
2. Verify data integrity
3. Check application state
4. Monitor for issues

## Cost Management

### Resource Optimization
1. Right-size resources
2. Use auto-scaling
3. Monitor usage
4. Clean up unused resources

### Cost Monitoring
1. Azure Cost Management
2. Resource usage tracking
3. Budget alerts
4. Cost optimization recommendations

## Compliance

### Security Compliance
1. Regular security audits
2. Vulnerability scanning
3. Access review
4. Policy enforcement

### Data Compliance
1. Data retention policies
2. Privacy compliance
3. Backup verification
4. Audit logging

## Support

### Escalation Process
1. Level 1: On-call engineer
2. Level 2: DevOps team
3. Level 3: Architecture team
4. Level 4: External support

### Documentation
1. Incident response
2. Runbooks
3. Troubleshooting guides
4. Best practices 