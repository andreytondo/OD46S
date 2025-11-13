pipeline {
    agent any
    stages {   
        stage('Build via Docker Compose') {
            steps {
                sh 'docker compose --profile app up -d --build'
            }
        }
    }
}