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


        stage('Configure EKS Access') {
    steps {
        sh '''
            set -e

            echo "======================================"
            echo "Configuring EKS access"
            echo "======================================"

            mkdir -p "$HOME/.kube"

            aws eks update-kubeconfig \
              --region "${AWS_REGION}" \
              --name "namistore-eks"

            echo ""
            echo "--- Verifying EKS access ---"

            kubectl get nodes
            kubectl get deployments -n namistore
        '''
    }
}



        stage('Deploy to EKS') {
    steps {
        sh '''
            set -e

            BACKEND_IMAGE_FULL="${BACKEND_IMAGE}:${BUILD_NUMBER}"
            FRONTEND_IMAGE_FULL="${FRONTEND_IMAGE}:${BUILD_NUMBER}"

            echo "======================================"
            echo "Deploying to EKS"
            echo "======================================"
            echo "Backend:  $BACKEND_IMAGE_FULL"
            echo "Frontend: $FRONTEND_IMAGE_FULL"
            echo "======================================"

            echo ""
            echo "--- Updating backend ---"

            kubectl -n namistore set image \
              deployment/namistore-backend \
              namistore-backend="$BACKEND_IMAGE_FULL"

            echo ""
            echo "--- Updating frontend ---"

            kubectl -n namistore set image \
              deployment/namistore-frontend \
              namistore-frontend="$FRONTEND_IMAGE_FULL"

            echo ""
            echo "======================================"
            echo "Waiting for backend rollout..."
            echo "======================================"

            if ! kubectl -n namistore rollout status \
              deployment/namistore-backend \
              --timeout=5m; then

                echo "Backend rollout failed."
                echo "Rolling back backend..."

                kubectl -n namistore rollout undo \
                  deployment/namistore-backend

                kubectl -n namistore rollout status \
                  deployment/namistore-backend \
                  --timeout=5m || true

                exit 1
            fi

            echo ""
            echo "======================================"
            echo "Waiting for frontend rollout..."
            echo "======================================"

            if ! kubectl -n namistore rollout status \
              deployment/namistore-frontend \
              --timeout=5m; then

                echo "Frontend rollout failed."
                echo "Rolling back frontend..."

                kubectl -n namistore rollout undo \
                  deployment/namistore-frontend

                kubectl -n namistore rollout status \
                  deployment/namistore-frontend \
                  --timeout=5m || true

                exit 1
            fi

            echo ""
            echo "======================================"
            echo "Checking deployed pods"
            echo "======================================"

            kubectl -n namistore get pods

            echo ""
            echo "======================================"
            echo "EKS DEPLOYMENT SUCCESSFUL"
            echo "======================================"
        '''
    }
}



        stage('Cleanup Jenkins Docker Images') {
    steps {
        sh '''
            set -e

            echo "======================================"
            echo "Cleaning Jenkins Docker images"
            echo "======================================"

            echo ""
            echo "--- Docker disk usage before cleanup ---"
            docker system df

            echo ""
            echo "--- Removing unused Docker images ---"
            docker image prune -af

            echo ""
            echo "--- Docker disk usage after cleanup ---"
            docker system df

            echo ""
            echo "======================================"
            echo "Docker cleanup completed"
            echo "======================================"
        '''
    }
}





    }
}
