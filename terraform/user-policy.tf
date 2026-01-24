# This policy allows your IAM user to pass the role to Amplify
resource "aws_iam_user_policy" "iconcoderz_passrole" {
  name = "AmplifyPassRolePolicy"
  user = "iconcoderz"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = "iam:PassRole"
        Resource = aws_iam_role.amplify_role.arn
        Condition = {
          StringEquals = {
            "iam:PassedToService" = "amplify.amazonaws.com"
          }
        }
      }
    ]
  })
}