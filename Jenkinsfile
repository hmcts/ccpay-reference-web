#!groovy

properties(
  [[$class: 'GithubProjectProperty', projectUrlStr: 'http://git.reform/cmc/citizen-frontend/'],
   pipelineTriggers([[$class: 'GitHubPushTrigger']])]
)

@Library('Reform')
import uk.gov.hmcts.Deployer
import uk.gov.hmcts.Packager

@Library('CMC')
import uk.gov.hmcts.cmc.smoketests.SmokeTests

def deployer = new Deployer(steps, 'cmc')
def packager = new Packager(steps, 'cmc')

def smokeTests = new SmokeTests(steps, '15s')

node {
  try {
    def version = "{citizen_frontend_buildnumber: ${env.BUILD_NUMBER}}"

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

    stage('Package application (RPM)') {
      packager.nodeRPM('master', 'citizen-frontend')
    }

    stage('Package application (Docker)') {
      dockerImage imageName: 'cmc/citizen-frontend'
      dockerImage imageName: 'cmc/citizen-frontend-haproxy', context: 'docker/haproxy'
    }

    if ("master" == "${env.BRANCH_NAME}") {
      def deployPlaybook = 'deploy.yml'
      stage('Deploy (Dev)') {
        deployer.deploy(version, 'dev', deployPlaybook)
      }
      stage('Smoke test (Dev)') {
        smokeTests.executeAgainst(env.CMC_DEV_APPLICATION_URL)
      }
      stage('Deploy (Demo)') {
        deployer.deploy(version, 'demo', deployPlaybook)
      }
    }
  } catch (err) {
    slackSend(
      channel: '#cmc-tech-notification',
      color: 'danger',
      message: "${env.JOB_NAME}:  <${env.BUILD_URL}console|Build ${env.BUILD_DISPLAY_NAME}> has FAILED")
    throw err
  }
}
