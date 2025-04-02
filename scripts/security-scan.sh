#!/bin/bash

# Exit on error
set -e

# Install Trivy if not present
if ! command -v trivy &> /dev/null; then
    echo "Installing Trivy..."
    curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin
fi

# Scan Dockerfiles
echo "Scanning Dockerfiles..."
for dockerfile in $(find . -name Dockerfile); do
    echo "Scanning $dockerfile"
    trivy config --severity HIGH,CRITICAL --exit-code 0 "$dockerfile"
done

# Scan Dependencies
echo "Scanning dependencies..."
trivy fs --severity HIGH,CRITICAL --exit-code 0 .

# If ACR_NAME is provided, scan images
if [ ! -z "$ACR_NAME" ]; then
    echo "Scanning container images..."
    for service in frontend metrics-service user-service; do
        echo "Scanning $service image"
        trivy image --severity HIGH,CRITICAL --exit-code 0 "${ACR_NAME}/${service}:latest" || true
    done
fi

# Scan for secrets
echo "Scanning for secrets..."
trivy fs --security-checks secret . || true

echo "Security scan complete!" 