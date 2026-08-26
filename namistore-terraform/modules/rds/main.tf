resource "aws_db_subnet_group" "main" {
  name = "${var.identifier}-subnet-group"

  subnet_ids = var.private_subnet_ids

  tags = {
    Name        = "${var.identifier}-subnet-group"
    Environment = "production"
  }
}


resource "aws_db_instance" "main" {
  identifier = var.identifier

  engine = "postgres"

  db_name  = var.db_name
  username = var.username
  password = var.password

  instance_class = "db.t4g.micro"

  allocated_storage = 20
  storage_type      = "gp3"

  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [var.database_security_group_id]

  publicly_accessible = false

  multi_az = false

  backup_retention_period = 1

  skip_final_snapshot = true

  deletion_protection = false

  tags = {
    Name        = "namistore-postgresql"
    Environment = "production"
  }
}