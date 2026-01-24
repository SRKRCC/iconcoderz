resource "aws_amplify_app" "frontend" {
  name       = "iconcoderz-frontend"
  repository = var.repository

  oauth_token = var.github_token
  platform    = "WEB"

  build_spec = file("${path.module}/../amplify.yml")

  environment_variables = {
    VITE_API_BASE_URL = var.api_url
    GITHUB_TOKEN      = var.github_token
  }

  custom_rule {
    source = "/<*>"
    target = "/index.html"
    status = "200"
  }
}

resource "aws_amplify_branch" "main" {
  app_id            = aws_amplify_app.frontend.id
  branch_name       = "main"
  stage             = "PRODUCTION"
  enable_auto_build = true
}
