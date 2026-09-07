pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-south-1'

        ECR_REGISTRY = '274703560582.dkr.ecr.ap-south-1.amazonaws.com'

        BACKEND_IMAGE = '274703560582.dkr.ecr.ap-south-1.amazonaws.com/namistore-backend'
        FRONTEND_IMAGE = '274703560582.dkr.ecr.ap-south-1.amazonaws.com/namistore-frontend'
    }

    stages {

        

        stage('Build Backend') {
            steps {
                sh '''
                    docker build \
                      -t ${BACKEND_IMAGE}:${BUILD_NUMBER} \
                      ./namistore-backend
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                sh '''
                    docker build \
                      -t ${FRONTEND_IMAGE}:${BUILD_NUMBER} \
                      ./namistore-frontend
                '''
            }
        }

        stage('Login to ECR') {
            steps {
                sh '''
                    aws ecr get-login-password --region ${AWS_REGION} \
                    | docker login \
                      --username AWS \
                      --password-stdin ${ECR_REGISTRY}
                '''
            }
        }

        stage('Push Images') {
            steps {
                sh '''
                    docker push ${BACKEND_IMAGE}:${BUILD_NUMBER}
                    docker push ${FRONTEND_IMAGE}:${BUILD_NUMBER}
                '''
            }
        }

        


        stage('Deploy to EC2') {
    steps {
        sh '''
            set -e

            BACKEND_IMAGE_FULL="${BACKEND_IMAGE}:${BUILD_NUMBER}"
            FRONTEND_IMAGE_FULL="${FRONTEND_IMAGE}:${BUILD_NUMBER}"

            echo "======================================"
            echo "New backend:  $BACKEND_IMAGE_FULL"
            echo "New frontend: $FRONTEND_IMAGE_FULL"
            echo "======================================"

            # Create deployment script for the backend EC2
            cat > /tmp/deploy.sh <<EOF
#!/bin/bash

set -e

NEW_BACKEND_IMAGE="${BACKEND_IMAGE_FULL}"
NEW_FRONTEND_IMAGE="${FRONTEND_IMAGE_FULL}"

ECR_REGISTRY="${ECR_REGISTRY}"
AWS_REGION="${AWS_REGION}"

echo "======================================"
echo "Checking currently deployed version"
echo "======================================"

CURRENT_BACKEND_IMAGE=\\$(docker inspect -f '{{.Config.Image}}' namistore-backend 2>/dev/null || true)
CURRENT_FRONTEND_IMAGE=\\$(docker inspect -f '{{.Config.Image}}' namistore-frontend 2>/dev/null || true)

echo "Current backend:  \\$CURRENT_BACKEND_IMAGE"
echo "Current frontend: \\$CURRENT_FRONTEND_IMAGE"

echo ""
echo "======================================"
echo "Logging in to ECR"
echo "======================================"

aws ecr get-login-password --region "\\$AWS_REGION" |
docker login --username AWS --password-stdin "\\$ECR_REGISTRY"

echo ""
echo "======================================"
echo "Pulling new images"
echo "======================================"

docker pull "\\$NEW_BACKEND_IMAGE"
docker pull "\\$NEW_FRONTEND_IMAGE"

echo ""
echo "======================================"
echo "Stopping current containers"
echo "======================================"

docker stop namistore-backend namistore-frontend || true
docker rm namistore-backend namistore-frontend || true

echo ""
echo "======================================"
echo "Starting new containers"
echo "======================================"

DEPLOY_FAILED=0

docker run -d \
    --name namistore-backend \
    --restart unless-stopped \
    --env-file /opt/namistore/backend.env \
    -p 5000:5000 \
    "\\$NEW_BACKEND_IMAGE" || DEPLOY_FAILED=1

docker run -d \
    --name namistore-frontend \
    --restart unless-stopped \
    -p 3000:3000 \
    "\\$NEW_FRONTEND_IMAGE" || DEPLOY_FAILED=1

if [ "\\$DEPLOY_FAILED" -eq 1 ]; then
    echo ""
    echo "======================================"
    echo "NEW DEPLOYMENT FAILED"
    echo "Starting rollback..."
    echo "======================================"

    docker stop namistore-backend namistore-frontend || true
    docker rm namistore-backend namistore-frontend || true

    if [ -n "\\$CURRENT_BACKEND_IMAGE" ] && [ -n "\\$CURRENT_FRONTEND_IMAGE" ]; then

        echo "Restoring backend:  \\$CURRENT_BACKEND_IMAGE"
        echo "Restoring frontend: \\$CURRENT_FRONTEND_IMAGE"

        docker pull "\\$CURRENT_BACKEND_IMAGE"
        docker pull "\\$CURRENT_FRONTEND_IMAGE"

        docker run -d \
            --name namistore-backend \
            --restart unless-stopped \
            --env-file /opt/namistore/backend.env \
            -p 5000:5000 \
            "\\$CURRENT_BACKEND_IMAGE"

        docker run -d \
            --name namistore-frontend \
            --restart unless-stopped \
            -p 3000:3000 \
            "\\$CURRENT_FRONTEND_IMAGE"

        sleep 10

        echo "Checking rolled-back backend..."
        curl -f http://localhost:5000/api/products > /dev/null

        echo "Checking rolled-back frontend..."
        curl -f http://localhost:3000 > /dev/null

        echo "Rollback completed successfully."

    else
        echo "No previous deployment was found."
        echo "Rollback is not possible."
    fi

    exit 1
fi

echo ""
echo "======================================"
echo "Running health checks"
echo "======================================"

sleep 10

echo "--- Docker containers ---"
docker ps

echo ""
echo "--- Backend health check ---"

if ! curl -f http://localhost:5000/api/products > /dev/null; then

    echo "Backend health check FAILED."
    echo "Starting rollback..."

    docker stop namistore-backend namistore-frontend || true
    docker rm namistore-backend namistore-frontend || true

    if [ -n "\\$CURRENT_BACKEND_IMAGE" ] && [ -n "\\$CURRENT_FRONTEND_IMAGE" ]; then

        docker pull "\\$CURRENT_BACKEND_IMAGE"
        docker pull "\\$CURRENT_FRONTEND_IMAGE"

        docker run -d \
            --name namistore-backend \
            --restart unless-stopped \
            --env-file /opt/namistore/backend.env \
            -p 5000:5000 \
            "\\$CURRENT_BACKEND_IMAGE"

        docker run -d \
            --name namistore-frontend \
            --restart unless-stopped \
            -p 3000:3000 \
            "\\$CURRENT_FRONTEND_IMAGE"

        sleep 10

        curl -f http://localhost:5000/api/products > /dev/null
        curl -f http://localhost:3000 > /dev/null

        echo "Rollback completed successfully."
    else
        echo "No previous deployment available for rollback."
    fi

    exit 1
fi

echo "Backend is healthy."

echo ""
echo "--- Frontend health check ---"

if ! curl -f http://localhost:3000 > /dev/null; then

    echo "Frontend health check FAILED."
    echo "Starting rollback..."

    docker stop namistore-backend namistore-frontend || true
    docker rm namistore-backend namistore-frontend || true

    if [ -n "\\$CURRENT_BACKEND_IMAGE" ] && [ -n "\\$CURRENT_FRONTEND_IMAGE" ]; then

        docker pull "\\$CURRENT_BACKEND_IMAGE"
        docker pull "\\$CURRENT_FRONTEND_IMAGE"

        docker run -d \
            --name namistore-backend \
            --restart unless-stopped \
            --env-file /opt/namistore/backend.env \
            -p 5000:5000 \
            "\\$CURRENT_BACKEND_IMAGE"

        docker run -d \
            --name namistore-frontend \
            --restart unless-stopped \
            -p 3000:3000 \
            "\\$CURRENT_FRONTEND_IMAGE"

        sleep 10

        curl -f http://localhost:5000/api/products > /dev/null
        curl -f http://localhost:3000 > /dev/null

        echo "Rollback completed successfully."
    else
        echo "No previous deployment available for rollback."
    fi

    exit 1
fi

echo "Frontend is healthy."

echo ""
echo "======================================"
echo "DEPLOYMENT SUCCESSFUL"
echo "======================================"
echo "Backend:  \\$NEW_BACKEND_IMAGE"
echo "Frontend: \\$NEW_FRONTEND_IMAGE"
echo "======================================"

EOF

            chmod +x /tmp/deploy.sh

            # Encode the deployment script so SSM receives it safely
            DEPLOY_SCRIPT=$(base64 -w 0 /tmp/deploy.sh)

            echo ""
            echo "Sending deployment command to EC2..."

            COMMAND_ID=$(aws ssm send-command \
              --region "${AWS_REGION}" \
              --instance-ids i-0eaca22a088911f36 \
              --document-name "AWS-RunShellScript" \
              --parameters "commands=[
                \\"echo ${DEPLOY_SCRIPT} | base64 -d > /tmp/deploy.sh\\",
                \\"chmod +x /tmp/deploy.sh\\",
                \\"/tmp/deploy.sh\\"
              ]" \
              --query 'Command.CommandId' \
              --output text)

            echo "SSM Command ID: $COMMAND_ID"
            echo "Waiting for deployment..."

            while true; do

                STATUS=$(aws ssm get-command-invocation \
                  --region "${AWS_REGION}" \
                  --command-id "$COMMAND_ID" \
                  --instance-id i-0eaca22a088911f36 \
                  --query 'Status' \
                  --output text)

                echo "SSM Status: $STATUS"

                if [ "$STATUS" = "Success" ]; then

                    echo ""
                    echo "======================================"
                    echo "DEPLOYMENT COMPLETED SUCCESSFULLY"
                    echo "======================================"

                    aws ssm get-command-invocation \
                      --region "${AWS_REGION}" \
                      --command-id "$COMMAND_ID" \
                      --instance-id i-0eaca22a088911f36 \
                      --query 'StandardOutputContent' \
                      --output text

                    break
                fi

                if [ "$STATUS" = "Failed" ] || \
                   [ "$STATUS" = "Cancelled" ] || \
                   [ "$STATUS" = "TimedOut" ] || \
                   [ "$STATUS" = "Cancelling" ]; then

                    echo ""
                    echo "======================================"
                    echo "DEPLOYMENT FAILED"
                    echo "======================================"

                    aws ssm get-command-invocation \
                      --region "${AWS_REGION}" \
                      --command-id "$COMMAND_ID" \
                      --instance-id i-0eaca22a088911f36 \
                      --query '[Status,StandardOutputContent,StandardErrorContent]' \
                      --output text

                    exit 1
                fi

                sleep 5
            done
        '''
    }
}





    ```groovy
stage('Cleanup Old Docker Images') {
    steps {
        sh '''
            set -e

            echo "Starting Docker image cleanup..."

            COMMAND_ID=$(aws ssm send-command \
              --region "${AWS_REGION}" \
              --instance-ids i-0eaca22a088911f36 \
              --document-name "AWS-RunShellScript" \
              --parameters 'commands=[
                "set -e",
                "echo --- Running Namistore containers ---",
                "docker ps --format \\"{{.Names}} {{.Image}}\\" | grep "^namistore-" || true",
                "echo --- Removing unused Namistore images ---",
                "CURRENT_BACKEND=$(docker inspect namistore-backend --format "{{.Config.Image}}" 2>/dev/null || true)",
                "CURRENT_FRONTEND=$(docker inspect namistore-frontend --format "{{.Config.Image}}" 2>/dev/null || true)",
                "echo Current backend: $CURRENT_BACKEND",
                "echo Current frontend: $CURRENT_FRONTEND",
                "for IMAGE in $(docker images --format "{{.Repository}}:{{.Tag}}" | grep "^274703560582.dkr.ecr.ap-south-1.amazonaws.com/namistore-backend:" || true); do if [ "$IMAGE" != "$CURRENT_BACKEND" ]; then echo "Removing $IMAGE"; docker rmi "$IMAGE" || true; fi; done",
                "for IMAGE in $(docker images --format "{{.Repository}}:{{.Tag}}" | grep "^274703560582.dkr.ecr.ap-south-1.amazonaws.com/namistore-frontend:" || true); do if [ "$IMAGE" != "$CURRENT_FRONTEND" ]; then echo "Removing $IMAGE"; docker rmi "$IMAGE" || true; fi; done",
                "docker image prune -f",
                "echo --- Docker disk usage after cleanup ---",
                "docker system df"
              ]' \
              --query 'Command.CommandId' \
              --output text)

            echo "Cleanup SSM Command ID: $COMMAND_ID"
            echo "Waiting for cleanup to complete..."

            while true; do

                STATUS=$(aws ssm get-command-invocation \
                  --region "${AWS_REGION}" \
                  --command-id "$COMMAND_ID" \
                  --instance-id i-0eaca22a088911f36 \
                  --query 'Status' \
                  --output text)

                echo "Cleanup SSM Status: $STATUS"

                if [ "$STATUS" = "Success" ]; then

                    echo "Cleanup command completed successfully."

                    aws ssm get-command-invocation \
                      --region "${AWS_REGION}" \
                      --command-id "$COMMAND_ID" \
                      --instance-id i-0eaca22a088911f36 \
                      --query 'StandardOutputContent' \
                      --output text

                    break
                fi

                if [ "$STATUS" = "Failed" ] || \
                   [ "$STATUS" = "Cancelled" ] || \
                   [ "$STATUS" = "TimedOut" ] || \
                   [ "$STATUS" = "Cancelling" ]; then

                    echo "Docker cleanup failed."

                    aws ssm get-command-invocation \
                      --region "${AWS_REGION}" \
                      --command-id "$COMMAND_ID" \
                      --instance-id i-0eaca22a088911f36 \
                      --query '[Status,StandardOutputContent,StandardErrorContent]' \
                      --output text

                    exit 1
                fi

                sleep 5
            done
        '''
    }
}
```


    }
}