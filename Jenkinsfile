pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE_NAME = "your_image_name"
        REMOTE_HOST = "your_remote_host_ip"
        REMOTE_USER = "your_remote_username"
        REMOTE_DIR = "/path/to/remote/directory"
        DOCKERHUB_USERNAME = "zakaria2novomind"  //${secrets.DOCKERHUB_USERNAME }
        DOCKERHUB_TOKEN = "dckr_pat_2sfHp-akKQK26vCzsgtyOPt6ZHc" //${secrets.DOCKERHUB_TOKEN }
         
    }

    stages {
        stage('Create .env file') {
            steps {
                script {
                    // Create .env file with desired values
                    sh "echo 'OPEN_WEATHER_API = d11ad90a4ab6e0b72bf65e5ce7970f92' > .env"
                    sh "echo 'NREL_PVWATT_KEY =  bRLrzOOFeHPpnRnqxxzskorqS298hf6JiND8iBFB' >> .env"
                    sh "echo 'PREISE_API_KEY = 9d0fa79f58msh0f17d31a9e3cec0p178bc2jsn3619ac449c78' >> .env"

                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Build Node.js application
                    sh "npm install"
                    sh "npm run build"
                    sh "docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_TOKEN}"
                    // Build Docker image
                    sh "docker build -t ${DOCKERHUB_USERNAME}/prosumer_app_jenkins:latest ."
                }
            }
        }
        
        stage('Push to Registry') {
            steps {
                script {
                    // Push Docker image to a Docker registry
                    sh "docker push ${DOCKERHUB_USERNAME}/prosumer_app_jenkins:latest"
                }
            }
        }
        
        // stage('Deploy') {
        //     steps {
        //         script {
        //             // SSH into remote host and deploy Docker image
        //             sshagent(['your_ssh_credentials']) {
        //                 sh """
        //                     ssh ${REMOTE_USER}@${REMOTE_HOST} 'docker pull ${DOCKER_IMAGE_NAME}'
        //                     ssh ${REMOTE_USER}@${REMOTE_HOST} 'docker stop ${DOCKER_IMAGE_NAME} || true'
        //                     ssh ${REMOTE_USER}@${REMOTE_HOST} 'docker run -d --name ${DOCKER_IMAGE_NAME} -p 80:80 ${DOCKER_IMAGE_NAME}'
        //                 """
        //             }
        //         }
        //     }
        // }
    }
}