resource "aws_s3_bucket" "images" {
  bucket = var.bucket_name

  tags = {
    Name        = "namistore-product-images"
    Environment = "production"
  }
}

resource "aws_iam_policy" "ec2_s3_access" {
  name = "namistore-ec2-s3-access"

  policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Action = [
          "s3:PutObject",
          "s3:GetObject",
          "s3:DeleteObject"
        ]

        Resource = "${aws_s3_bucket.images.arn}/*"
      },
      {
        Effect = "Allow"

        Action = [
          "s3:ListBucket"
        ]

        Resource = aws_s3_bucket.images.arn
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ec2_s3_access" {
  role       = "namistore-ec2-ssm-role"
  policy_arn = aws_iam_policy.ec2_s3_access.arn
}