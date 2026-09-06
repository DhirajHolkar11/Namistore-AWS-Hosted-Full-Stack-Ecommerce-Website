resource "aws_ecr_repository" "backend" {
  name                 = "namistore-backend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name        = "namistore-backend"
    Environment = "production"
  }
}

resource "aws_ecr_repository" "frontend" {
  name                 = "namistore-frontend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name        = "namistore-frontend"
    Environment = "production"
  }
}