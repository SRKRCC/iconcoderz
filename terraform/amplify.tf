resource "aws_amplify_app" "frontend" {
  name       = "iconcoderz-frontend"
  repository = var.repository

  oauth_token = var.github_token
  platform    = "WEB"

  iam_service_role_arn = aws_iam_role.amplify_role.arn

  build_spec = file("${path.module}/../amplify.yml")

  environment_variables = {
    VITE_API_BASE_URL = var.api_url
  }

  custom_rule {
    source = "</^[^.]+$|\\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|webp)$)([^.]+$)/>"
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
