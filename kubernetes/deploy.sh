#!/bin/bash

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check for required commands
echo "Checking prerequisites..."
for cmd in kubectl az; do
    if ! command_exists "$cmd"; then
        echo "Error: $cmd is required but not installed."
        exit 1
    fi
done

# Set variables
RESOURCE_GROUP="sasso-dev-rg"
AKS_CLUSTER="sasso-dev-aks"

# Connect to AKS
echo "Connecting to AKS cluster..."
az aks get-credentials --resource-group $RESOURCE_GROUP --name $AKS_CLUSTER --overwrite-existing

# Create namespace if it doesn't exist
echo "Creating namespace if it doesn't exist..."
kubectl create namespace sasso --dry-run=client -o yaml | kubectl apply -f -

# Apply ConfigMap
echo "Applying ConfigMap..."
kubectl apply -f config.yaml

# Apply Services
echo "Applying Services..."
kubectl apply -f services.yaml

# Apply Deployments
echo "Applying Deployments..."
kubectl apply -f metrics-service.yaml
kubectl apply -f user-deployment.yaml
kubectl apply -f frontend-deployment.yaml

# Apply HPA
echo "Applying HPA..."
kubectl apply -f hpa.yaml

# Function to wait for deployment
wait_for_deployment() {
    echo "Waiting for deployment $1..."
    kubectl wait --for=condition=available deployment/$1 --timeout=300s
    if [ $? -ne 0 ]; then
        echo "Error: Deployment $1 failed to become ready"
        kubectl describe deployment/$1
        kubectl get events --field-selector involvedObject.name=$1
        exit 1
    fi
}

# Wait for deployments
echo "Waiting for deployments to be ready..."
wait_for_deployment "metrics-service"
wait_for_deployment "user-service"
wait_for_deployment "frontend"

# Function to get service URL
get_service_url() {
    local service=$1
    local port=$2
    echo "Waiting for $service external IP..."
    local ip=""
    while [ -z "$ip" ]; do
        ip=$(kubectl get service $service -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 2>/dev/null)
        if [ -z "$ip" ]; then
            echo "Waiting for $service IP..."
            sleep 10
        fi
    done
    echo "http://$ip:$port"
}

# Get service URLs
echo -e "\nService endpoints:"
echo "Frontend: $(get_service_url frontend-service 80)"
echo "Metrics API: $(get_service_url metrics-service 4003)"
echo "User API: $(get_service_url user-service 4002)"

# Print pod status
echo -e "\nPod status:"
kubectl get pods

# Print service status
echo -e "\nService status:"
kubectl get services

echo -e "\nDeployment complete!" 