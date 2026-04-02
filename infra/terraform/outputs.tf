output "droplet_ip" {
  description = "Reserved IP assigned to the droplet"
  value       = digitalocean_reserved_ip.app.ip_address
}

output "droplet_id" {
  description = "Droplet ID"
  value       = digitalocean_droplet.app.id
}

output "ssh_command" {
  description = "SSH into the droplet"
  value       = "ssh root@${digitalocean_reserved_ip.app.ip_address}"
}

output "firewall_id" {
  description = "Firewall ID"
  value       = digitalocean_firewall.app.id
}
