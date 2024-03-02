pipeline {
  agent any
  stages {
    stage('Create .env file') {
      steps {
        script {
          sh "echo 'OPEN_WEATHER_API = d11ad90a4ab6e0b72bf65e5ce7970f92' > .env"
          sh "echo 'NREL_PVWATT_KEY =  bRLrzOOFeHPpnRnqxxzskorqS298hf6JiND8iBFB' >> .env"
          sh "echo 'PREISE_API_KEY = 9d0fa79f58msh0f17d31a9e3cec0p178bc2jsn3619ac449c78' >> .env"
        }

      }
    }

    stage('Build') {
      steps {
        script {
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
          sh "docker push ${DOCKERHUB_USERNAME}/prosumer_app_jenkins:latest"
        }

      }
    }

  }
  environment {
    DOCKER_IMAGE_NAME = 'your_image_name'
    REMOTE_HOST = 'your_remote_host_ip'
    REMOTE_USER = 'your_remote_username'
    REMOTE_DIR = '/path/to/remote/directory'
    DOCKERHUB_USERNAME = 'zakaria2novomind'
    DOCKERHUB_TOKEN = 'dckr_pat_2sfHp-akKQK26vCzsgtyOPt6ZHc'
  }
}