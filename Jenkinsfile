pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Prachi12003/Devops-project.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('Backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Build Application') {
            steps {
                echo 'Build completed successfully'
            }
        }
    }

    post {
        success {
            echo 'CI Pipeline SUCCESS'
        }
        failure {
            echo 'CI Pipeline FAILED'
        }
    }
}
