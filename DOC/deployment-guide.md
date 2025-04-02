# Deployment Guide for Sasso Webflow Infrastructure

This guide documents the process of deploying the infrastructure using Azure DevOps Pipeline and manual role assignments.

## Prerequisites

1. **Azure Subscription**
   - Active Azure subscription
   - Subscription ID (from Azure Portal)
   - Tenant ID (from Azure Portal)

2. **Azure DevOps Project**
   - Access to Azure DevOps organization
   - Permissions to create and run pipelines

3. **Required Azure Resources**
   - Storage Account for Terraform state
   - Resource Group for state storage
   - Container for state files

4. **Service Principal**
   - Contributor access to the subscription
   - Access to the storage account for state management

## Project Structure

```
sasso-webflow-app/
├── terraform/
│   ├── main.tf           # Main infrastructure configuration
│   ├── variables.tf      # Variable definitions
│   ├── providers.tf      # Azure provider configuration
│   └── outputs.tf        # Output definitions
├── .azure-pipelines/
│   └── terraform-pipeline.yml  # Pipeline definition
└── DOC/
    └── deployment-guide.md     # This guide
```

## Step-by-Step Deployment Process

### 1. Repository Setup

1. Clone the repository to your local machine
2. Ensure all Terraform files are present in the `terraform` directory
3. Verify the `.azure-pipelines` directory contains the pipeline YAML

### 2. Azure DevOps Pipeline Configuration

1. **Create Pipeline**
   - Go to Azure DevOps > Pipelines > New Pipeline
   - Select "Azure Repos Git" as source
   - Select your repository
   - Choose "Existing Azure Pipelines YAML file"
   - Select `/.azure-pipelines/terraform-pipeline.yml`

2. **Configure Pipeline Variables**
   ```yaml
   parameters:
   - name: createResourceGroup
     displayName: 'Create New Resource Group'
     type: boolean
     default: true
   - name: environment
     displayName: 'Environment'
     type: string
     default: 'dev'
   - name: location
     displayName: 'Azure Region'
     type: string
     default: 'westeurope'
   - name: aksNodeCount
     displayName: 'AKS Node Count'
     type: number
     default: 1
   ```

3. **Configure Service Connection**
   - Go to Project Settings > Service Connections
   - Create new "Azure Resource Manager" connection
   - Name it as referenced in your pipeline (AZURE_SUBSCRIPTION)
   - Save and verify connection

### 3. Infrastructure Deployment

1. **Initial Pipeline Run**
   - Navigate to the pipeline in Azure DevOps
   - Click "Run Pipeline"
   - Set parameters:
     - createResourceGroup: true
     - environment: dev
     - location: westeurope
     - aksNodeCount: 1

2. **Monitor Deployment**
   - Watch the pipeline execution
   - Check each stage completion
   - Verify resource creation in Azure Portal

### 4. Post-Deployment Configuration

After successful deployment, manual role assignments are required:

1. **ACR Pull Role Assignment**
   ```
   Resource: Azure Container Registry
   Steps:
   1. Navigate to ACR in Azure Portal
   2. Go to Access Control (IAM)
   3. Click "+ Add" > "Add role assignment"
   4. Role: AcrPull
   5. Assign access to: Managed Identity
   6. Select: AKS cluster's managed identity
   7. Review + Assign
   ```

2. **Network Contributor Role Assignment**
   ```
   Resource: Resource Group
   Steps:
   1. Navigate to Resource Group in Azure Portal
   2. Go to Access Control (IAM)
   3. Click "+ Add" > "Add role assignment"
   4. Role: Network Contributor
   5. Assign access to: Managed Identity
   6. Select: AKS cluster's managed identity
   7. Review + Assign
   ```

## Resource Configuration Details

### AKS Cluster Configuration
```hcl
VM Size: Standard_B2s
Initial Node Count: 1
Auto-scaling:
  - Minimum: 1
  - Maximum: 2
Version: 1.30.10
```

### Networking
```hcl
Network Plugin: Azure CNI
Network Policy: Azure
Load Balancer SKU: Standard
```

## Troubleshooting Guide

1. **Quota Limits**
   - Error: Insufficient vCPU quota
   - Solution: Using Standard_B2s with reduced node count
   - Alternative: Request quota increase

2. **Role Assignment Errors**
   - Error: Authorization Failed
   - Solution: Manual role assignment through Portal
   - Prevention: Ensure service principal has Owner/User Access Administrator role

3. **State Storage Issues**
   - Error: Cannot access state storage
   - Check: Storage account access and container existence
   - Solution: Verify storage account credentials and permissions

## Verification Steps

1. **AKS Cluster**
   ```bash
   az aks get-credentials --resource-group <resource-group-name> --name <cluster-name>
   kubectl get nodes
   ```

2. **ACR Access**
   ```bash
   az acr login --name <acr-name>
   ```

3. **Role Assignments**
   - Verify in Azure Portal > IAM sections
   - Check effective assignments for AKS managed identity

## Maintenance and Updates

1. **Regular Updates**
   - Check for AKS version updates
   - Review and update Terraform provider versions
   - Monitor resource usage and scaling

2. **Backup and Recovery**
   - Regular state file backups
   - Document any manual changes
   - Keep deployment parameters documented

## Security Considerations

1. **Access Control**
   - Regularly review role assignments
   - Audit service principal permissions
   - Monitor cluster access

2. **Network Security**
   - Review network policies
   - Monitor network traffic
   - Keep security patches up to date

## Important Notes

- Always review pipeline parameters before deployment
- Keep track of resource quotas and limits
- Document any manual steps performed
- Regular monitoring of resource usage
- Backup Terraform state files
- Test changes in development environment first 