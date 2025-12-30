pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Prachi12003/Devops-project.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'cd Food-Delivery-App-main\\Backend && npm install'
            }
        }

        stage('Run Application') {
            steps {
                bat 'cd Food-Delivery-App-main\\Backend && npm start'
            }
        }
    }
}
