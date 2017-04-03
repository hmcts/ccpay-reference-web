#!groovy

properties(
  [[$class: 'GithubProjectProperty', projectUrlStr: 'http://git.reform/common-components/reference-web'],
   pipelineTriggers([[$class: 'GitHubPushTrigger']])]
)

node {
  try {
    stage('Checkout') {
      deleteDir()
      checkout scm
    }

    stage('Setup') {
      sh '''
        yarn install
        yarn setup
      '''
    }

    stage('Lint') {
      sh "yarn run lint"
    }

    stage('Test') {
      sh "yarn test"
    }
  } catch (err) {
    slackSend(
      channel: '#cc_tech',
      color: 'danger',
      message: "${env.JOB_NAME}: <${env.BUILD_URL}console|Build ${env.BUILD_DISPLAY_NAME}> has FAILED")
    throw err
  }
}
