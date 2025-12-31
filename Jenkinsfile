pipeline {
    agent any

    environment {
        NODE_ENV = 'development'
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo 'Cloning GitHub repository...'
                git branch: 'main',
                    url: 'https://github.com/Prachi12003/Devops-project.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing npm dependencies...'
                dir('Backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Application') {
            steps {
                echo 'Build stage completed (Node.js project)'
            }
        }

        stage('Run Application') {
            steps {
                echo 'Starting backend server...'
                dir('Backend') {
                    sh 'node server.js'
                }
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline executed successfully!'
        }
        failure {
            echo '❌ Pipeline failed. Check logs in Blue Ocean.'
        }
    }
}

