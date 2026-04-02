terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }

  cloud {
    organization = "fawzayni"

    workspaces {
      name = "al-azhar-production"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
}

# -----------------------------------------------------------------
# SSH Key (must already exist in your DO account)
# -----------------------------------------------------------------
data "digitalocean_ssh_key" "default" {
  name = var.ssh_key_name
}

# -----------------------------------------------------------------
# Droplet (already exists — import before applying)
# terraform import digitalocean_droplet.app 548724368
# -----------------------------------------------------------------
resource "digitalocean_droplet" "app" {
  name     = "stagging.api.ucak"
  region   = var.region
  size     = var.droplet_size
  image    = "ubuntu-22-04-x64"
  ssh_keys = [data.digitalocean_ssh_key.default.id]
  backups  = false

  lifecycle {
    prevent_destroy = true
    # user_data cannot be changed without recreating the droplet
    ignore_changes = [user_data]
  }

  tags = ["al-azhar", "production"]
}

# -----------------------------------------------------------------
# Reserved IP (already exists — import before applying)
# terraform import digitalocean_reserved_ip.app 159.89.251.91
# -----------------------------------------------------------------
resource "digitalocean_reserved_ip" "app" {
  region = var.region

  lifecycle {
    prevent_destroy = true
  }
}

# -----------------------------------------------------------------
# Reserved IP Assignment
# terraform import digitalocean_reserved_ip_assignment.app 159.89.251.91
# -----------------------------------------------------------------
resource "digitalocean_reserved_ip_assignment" "app" {
  ip_address = digitalocean_reserved_ip.app.ip_address
  droplet_id = digitalocean_droplet.app.id
}

# -----------------------------------------------------------------
# Firewall
# -----------------------------------------------------------------
resource "digitalocean_firewall" "app" {
  name        = "al-azhar-production"
  droplet_ids = [digitalocean_droplet.app.id]

  # HTTP
  inbound_rule {
    protocol         = "tcp"
    port_range       = "80"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  # HTTPS
  inbound_rule {
    protocol         = "tcp"
    port_range       = "443"
    source_addresses = ["0.0.0.0/0", "::/0"]
  }

  # SSH — restricted to IPs listed in ssh_allowed_ips
  dynamic "inbound_rule" {
    for_each = length(var.ssh_allowed_ips) > 0 ? [1] : []
    content {
      protocol         = "tcp"
      port_range       = "22"
      source_addresses = var.ssh_allowed_ips
    }
  }

  # Outbound — unrestricted
  outbound_rule {
    protocol              = "tcp"
    port_range            = "1-65535"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "udp"
    port_range            = "1-65535"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }

  outbound_rule {
    protocol              = "icmp"
    destination_addresses = ["0.0.0.0/0", "::/0"]
  }
}
