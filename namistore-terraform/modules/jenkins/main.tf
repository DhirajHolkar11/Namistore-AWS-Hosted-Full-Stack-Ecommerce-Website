resource "aws_iam_role" "jenkins" {
  name = "namistore-jenkins-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Principal = {
          Service = "ec2.amazonaws.com"
        }

        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ssm" {
  role       = aws_iam_role.jenkins.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
}

resource "aws_iam_policy" "jenkins_deploy" {
  name = "namistore-jenkins-deploy-policy"

  policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Action = [
          "ecr:GetAuthorizationToken"
        ]

        Resource = "*"
      },
      {
        Effect = "Allow"

        Action = [
          "ecr:BatchCheckLayerAvailability",
          "ecr:CompleteLayerUpload",
          "ecr:InitiateLayerUpload",
          "ecr:PutImage",
          "ecr:UploadLayerPart"
        ]

        Resource = [
          "arn:aws:ecr:ap-south-1:274703560582:repository/namistore-backend",
          "arn:aws:ecr:ap-south-1:274703560582:repository/namistore-frontend"
        ]
      },
      {
        Effect = "Allow"

        Action = [
          "ssm:SendCommand"
        ]

        Resource = [
          "arn:aws:ssm:ap-south-1:274703560582:document/AWS-RunShellScript",
          "arn:aws:ec2:ap-south-1:274703560582:instance/i-0eaca22a088911f36"
        ]
      },
      {
        Effect = "Allow"

        Action = [
          "ssm:GetCommandInvocation",
          "ssm:ListCommandInvocations"
        ]

        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "jenkins_deploy" {
  role       = aws_iam_role.jenkins.name
  policy_arn = aws_iam_policy.jenkins_deploy.arn
}

resource "aws_iam_instance_profile" "jenkins" {
  name = "namistore-jenkins-profile"
  role = aws_iam_role.jenkins.name
}

resource "aws_instance" "jenkins" {
  ami = "ami-07e5ce642bbc48c0d"

  instance_type = var.instance_type

  subnet_id = var.subnet_id

  vpc_security_group_ids = [
    var.security_group_id
  ]

  associate_public_ip_address = true

  iam_instance_profile = aws_iam_instance_profile.jenkins.name

  root_block_device {
    volume_size = 20
    volume_type = "gp3"
  }

  tags = {
    Name = var.instance_name
  }


  user_data = <<-EOF
              #!/bin/bash

              apt-get update -y

              snap install amazon-ssm-agent --classic

              systemctl enable snap.amazon-ssm-agent.amazon-ssm-agent
              systemctl start snap.amazon-ssm-agent.amazon-ssm-agent
              EOF
}