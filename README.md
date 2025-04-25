# ☸️ Cloud-Native Microservices on GKE

This project showcases a cloud-native microservice-based architecture using **Docker**, **Kubernetes (GKE)**, and **Google Cloud Platform (GCP)** services. It demonstrates the deployment of two interconnected microservices with a shared persistent volume, all managed through an automated CI/CD pipeline.

---

## ⚙️ Technologies Used

- 🐳 **Docker** – Encapsulates services into lightweight containers  
- ☸️ **Kubernetes (GKE)** – Orchestrates and manages containerized applications  
- 🔁 **Google Cloud Build** – Automates build and deployment processes  
- 🗂️ **Artifact Registry** – Stores and serves Docker images securely  
- 📁 **Cloud Source Repositories** – Hosts version-controlled project code  
- 💻 **kubectl** – CLI tool for interacting with Kubernetes clusters  

---

## 🧱 System Architecture

### 📦 Microservice Containerization
Each microservice is containerized using Docker for consistency across environments.

### 🔄 Continuous Integration & Delivery
CI/CD pipeline configured with **Cloud Build** ensures code changes are automatically built, tested, and deployed.

### ☁️ Kubernetes on GKE
Deployed to **Google Kubernetes Engine**, allowing for robust orchestration, auto-scaling, and resilience.

### 🗃️ Shared Storage Layer
Both microservices access a **Kubernetes Persistent Volume**, enabling seamless data sharing between them.

---

## 🌟 Core Features

- 🔗 **Microservices Communication** – REST-based communication between services  
- 🔄 **Automated CI/CD** – End-to-end deployment pipeline powered by Cloud Build  
- 🧠 **Data Persistence** – Shared storage using persistent volumes across pods  
- 📜 **K8s Manifests** – YAML files define deployments, services, and volumes  

