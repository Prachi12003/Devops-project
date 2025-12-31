pipeline {
    agent any

    stages {

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
