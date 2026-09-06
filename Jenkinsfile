pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-south-1'

        ECR_REGISTRY = '274703560582.dkr.ecr.ap-south-1.amazonaws.com'

        BACKEND_IMAGE = '274703560582.dkr.ecr.ap-south-1.amazonaws.com/namistore-backend'
        FRONTEND_IMAGE = '274703560582.dkr.ecr.ap-south-1.amazonaws.com/namistore-frontend'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

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

        // stage('Test Deployment Access') {
        //     steps {
        //         sh '''
        //     aws ssm send-command \
        //       --region ${AWS_REGION} \
        //       --instance-ids i-0eaca22a088911f36 \
        //       --document-name "AWS-RunShellScript" \
        //       --parameters 'commands=[
        //         "docker pull ${BACKEND_IMAGE}:${BUILD_NUMBER}",
        //         "docker pull ${FRONTEND_IMAGE}:${BUILD_NUMBER}",
        //         "docker image inspect ${BACKEND_IMAGE}:${BUILD_NUMBER}",
        //         "docker image inspect ${FRONTEND_IMAGE}:${BUILD_NUMBER}"
        //       ]' \
        //       --output text
        //         '''
        //     }
        // }


        stage('Test Deployment Access') {
        steps {
            sh '''
            set -e

            COMMAND_ID=$(aws ssm send-command \
              --region ${AWS_REGION} \
              --instance-ids i-0eaca22a088911f36 \
              --document-name "AWS-RunShellScript" \
              --parameters 'commands=[
                "docker pull ${BACKEND_IMAGE}:${BUILD_NUMBER}",
                "docker pull ${FRONTEND_IMAGE}:${BUILD_NUMBER}",
                "docker image inspect ${BACKEND_IMAGE}:${BUILD_NUMBER}",
                "docker image inspect ${FRONTEND_IMAGE}:${BUILD_NUMBER}"
              ]' \
              --query 'Command.CommandId' \
              --output text)

            echo "SSM Command ID: $COMMAND_ID"

            echo "Waiting for SSM command to complete..."

            while true; do

                STATUS=$(aws ssm get-command-invocation \
                  --region ${AWS_REGION} \
                  --command-id "$COMMAND_ID" \
                  --instance-id i-0eaca22a088911f36 \
                  --query 'Status' \
                  --output text)

                echo "SSM Status: $STATUS"

                if [ "$STATUS" = "Success" ]; then
                    echo "SSM command completed successfully."

                    aws ssm get-command-invocation \
                      --region ${AWS_REGION} \
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

                    echo "SSM command failed."

                    aws ssm get-command-invocation \
                      --region ${AWS_REGION} \
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



    }

}