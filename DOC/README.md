# Sasso Webflow Application Documentation

## Overview
Sasso Webflow is a modern web application built with React, TypeScript, and deployed on Azure Kubernetes Service (AKS). The application consists of multiple microservices and a frontend application, all containerized and managed through Azure DevOps pipelines.

## Table of Contents
1. [Architecture Overview](./architecture.md)
2. [Getting Started](./getting-started.md)
3. [Development Guide](./development.md)
4. [Deployment Guide](./deployment.md)
5. [API Documentation](./api.md)
6. [Monitoring and Logging](./monitoring.md)
7. [Security](./security.md)
8. [Troubleshooting](./troubleshooting.md)

## Quick Start
1. Clone the repository
2. Install dependencies
3. Set up environment variables
4. Run locally or deploy to Azure

For detailed instructions, see the [Getting Started Guide](./getting-started.md).

## Project Structure
```
sasso-webflow-app/
├── frontend/                 # React frontend application
├── services/                 # Microservices
│   ├── analytics/           # Analytics service
│   ├── metrics/             # Metrics service
│   └── user-management/     # User management service
├── kubernetes/              # Kubernetes manifests
├── .azure-pipelines/        # Azure DevOps pipeline configurations
└── helm/                    # Helm charts
```

## Technology Stack
- Frontend: React, TypeScript, Tailwind CSS
- Backend: Node.js, Express
- Container: Docker
- Orchestration: Kubernetes
- Cloud: Azure (AKS, ACR)
- CI/CD: Azure DevOps
- Monitoring: Azure Monitor
- Testing: Jest, React Testing Library

## Contributing
Please read our [Contributing Guide](./contributing.md) before submitting pull requests.

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details. 