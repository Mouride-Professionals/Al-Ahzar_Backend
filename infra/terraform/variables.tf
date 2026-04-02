variable "do_token" {
  description = "DigitalOcean API token"
  type        = string
  sensitive   = true
}

variable "region" {
  description = "DigitalOcean region"
  type        = string
  default     = "lon1"
}

variable "droplet_size" {
  description = "Droplet size slug"
  type        = string
  default     = "s-1vcpu-2gb"
}

variable "ssh_key_name" {
  description = "Name of the SSH key in your DigitalOcean account"
  type        = string
}

variable "ssh_allowed_ips" {
  description = "List of IPs allowed SSH access (CIDR). Add your own IP: [\"x.x.x.x/32\"]"
  type        = list(string)
  default     = []
}
