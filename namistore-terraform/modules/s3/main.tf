resource "aws_s3_bucket" "images" {
  bucket = var.bucket_name

  tags = {
    Name        = "namistore-product-images"
    Environment = "production"
  }
}