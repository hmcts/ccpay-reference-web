#!groovy

@Library('Reform') _

properties(
  [[$class: 'GithubProjectProperty', projectUrlStr: 'https://git.reform.hmcts.net/common-components/reference-web'],
   pipelineTriggers([[$class: 'GitHubPushTrigger']])]
)

stageWithNotification('Checkout') {
  deleteDir()
  checkout scm
}

stageWithNotification('Setup') {
  sh '''
        yarn install
        yarn setup
      '''
}

stageWithNotification('Lint') {
  sh "yarn run lint"
}

stageWithNotification('Test') {
  sh "yarn test"
}

stageWithNotification('Package application (Docker)') {
  dockerImage imageName: 'common-components/reference-web'
}

private stageWithNotification(String name, Closure body) {
  stage(name) {
    node {
      try {
        body()
      } catch (err) {
        notifyBuildFailure channel: '#cc_tech'
        throw err
      }
    }
  }
}
