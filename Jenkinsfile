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
                  //  sh "touch .env"
                    bat "echo OPEN_WEATHER_API = d11ad90a4ab6e0b72bf65e5ce7970f92 > .env"
                    bat "echo NREL_PVWATT_KEY =  bRLrzOOFeHPpnRnqxxzskorqS298hf6JiND8iBFB >> .env"
                    bat "echo PREISE_API_KEY = 9d0fa79f58msh0f17d31a9e3cec0p178bc2jsn3619ac449c78 >> .env"
                    // writeFile file: '.env', text: """
                    //     OPEN_WEATHER_API = d11ad90a4ab6e0b72bf65e5ce7970f92
                    //     NREL_PVWATT_KEY =  bRLrzOOFeHPpnRnqxxzskorqS298hf6JiND8iBFB
                    //     PREISE_API_KEY = 9d0fa79f58msh0f17d31a9e3cec0p178bc2jsn3619ac449c78
                    // """

      }
    }
        }

    // stage('Build') {
    //   steps {
    //     script {
    //       sh "npm install"
    //       sh "npm run build"
    //       sh "docker login -u ${DOCKERHUB_USERNAME} -p ${DOCKERHUB_TOKEN}"
    //       // Build Docker image
    //       sh "docker build -t ${DOCKERHUB_USERNAME}/prosumer_app_jenkins:latest ."
    //     }

    //   }
    // }

    // stage('Push to Registry') {
    //   steps {
    //     script {
    //       sh "docker push ${DOCKERHUB_USERNAME}/prosumer_app_jenkins:latest"
    //     }

    //   }
    // }

  }

}

