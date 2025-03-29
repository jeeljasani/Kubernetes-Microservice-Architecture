provider "google" {
  project = "kubernetes-assignment-453414"
  region  = "us-central1"
  zone    = "us-central1-c"
}

resource "google_container_cluster" "primary" {
  name     = "kubernetes-assignment-cluster"
  location = "us-central1-c"
  deletion_protection = false
  
  # Remove default node pool after creation
  remove_default_node_pool = true
  initial_node_count       = 1

  # Specify the GKE version
  min_master_version = "latest"
}

resource "google_container_node_pool" "primary_nodes" {
  name       = "primary-node-pool"
  location   = "us-central1-c"
  cluster    = google_container_cluster.primary.name
  node_count = 1

  node_config {
    machine_type = "e2-small"
    disk_size_gb = 10
    disk_type    = "pd-standard"
    image_type   = "cos_containerd"

    # Google recommends custom service accounts with minimal permissions
    oauth_scopes = [
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ]
  }
}