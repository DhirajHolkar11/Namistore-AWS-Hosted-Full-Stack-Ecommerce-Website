
resource "aws_iam_instance_profile" "backend" {
  name = "namistore-ec2-ssm-profile"
  role = "namistore-ec2-ssm-role"
}


resource "aws_iam_role_policy_attachment" "ecr_read_only" {
  role       = "namistore-ec2-ssm-role"
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}



resource "aws_instance" "backend" {

  ami = "ami-07e5ce642bbc48c0d"

  instance_type = var.instance_type

  subnet_id = var.subnet_id

  vpc_security_group_ids = [
    var.security_group_id
  ]

  associate_public_ip_address = true

  user_data_replace_on_change = true

  iam_instance_profile = aws_iam_instance_profile.backend.name



  user_data = <<-EOF
              #!/bin/bash

              apt-get update -y

              apt-get install -y postgresql-client

              snap install amazon-ssm-agent --classic

              systemctl enable snap.amazon-ssm-agent.amazon-ssm-agent
              systemctl start snap.amazon-ssm-agent.amazon-ssm-agent
              EOF

  tags = {
    Name = var.instance_name
  }
}