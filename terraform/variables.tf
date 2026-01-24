variable "github_token" {
  description = "GitHub PAT with repo access"
  type        = string
  sensitive   = true
}

variable "api_url" {
  description = "Public API Gateway URL"
  type        = string
}

variable "repository" {
  description = "GitHub Repository URL"
  type        = string
  default     = "https://github.com/SRKRCC/iconcoderz.git"
}
