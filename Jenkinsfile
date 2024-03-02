// pipeline {
//     agent any
    
//     environment {
//         DOCKER_IMAGE_NAME = "your_image_name"
//         REMOTE_HOST = "your_remote_host_ip"
//         REMOTE_USER = "your_remote_username"
//         REMOTE_DIR = "/path/to/remote/directory"
//         DOCKERHUB_USERNAME = "zakaria2novomind"  //${secrets.DOCKERHUB_USERNAME }
//         DOCKERHUB_TOKEN = "dckr_pat_2sfHp-akKQK26vCzsgtyOPt6ZHc" //${secrets.DOCKERHUB_TOKEN }
         
//     }

//     stages {
//         stage('Build') {
//             steps {
//                 script {
//                     // Build Node.js application
//                     sh "npm install"
//                     sh "npm run build"
//                     sh "docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_TOKEN}"
//                     // Build Docker image
//                     sh "docker build -t ${DOCKERHUB_USERNAME}/prosumer_app:latest ."
//                 }
//             }
//         }
        
//         stage('Push to Registry') {
//             steps {
//                 script {
//                     // Push Docker image to a Docker registry
//                     sh "docker push ${DOCKERHUB_USERNAME}/prosumer_app:latest"
//                 }
//             }
//         }
        
//         // stage('Deploy') {
//         //     steps {
//         //         script {
//         //             // SSH into remote host and deploy Docker image
//         //             sshagent(['your_ssh_credentials']) {
//         //                 sh """
//         //                     ssh ${REMOTE_USER}@${REMOTE_HOST} 'docker pull ${DOCKER_IMAGE_NAME}'
//         //                     ssh ${REMOTE_USER}@${REMOTE_HOST} 'docker stop ${DOCKER_IMAGE_NAME} || true'
//         //                     ssh ${REMOTE_USER}@${REMOTE_HOST} 'docker run -d --name ${DOCKER_IMAGE_NAME} -p 80:80 ${DOCKER_IMAGE_NAME}'
//         //                 """
//         //             }
//         //         }
//         //     }
//         // }
//     }
// }
