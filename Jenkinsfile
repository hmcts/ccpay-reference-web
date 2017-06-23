#!groovy

@Library("Reform")
import uk.gov.hmcts.Packager

def packager = new Packager(this, 'cc')

properties(
  [[$class: 'GithubProjectProperty', projectUrlStr: 'https://git.reform.hmcts.net/common-components/reference-web'],
   pipelineTriggers([[$class: 'GitHubPushTrigger']])]
)

milestone()
lock(resource: "reference-web-${env.BRANCH_NAME}", inversePrecedence: true) {
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

      ifMaster {
        def rpmVersion

        stage("Package RPM") {
          rpmVersion = packager.nodeRPM('reference-web')
        }

        stage("Publish RPM") {
          packager.publishNodeRPM('reference-web')
        }

        stage("Trigger acceptance tests") {
//                    build job: '/common-components/reference-web-acceptance-tests/master', parameters: [[$class: 'StringParameterValue', name: 'rpmVersion', value: rpmVersion]]
        }
      }

      milestone()
    } catch (err) {
      notifyBuildFailure channel: '#cc_tech'
      throw err
    }
  }
}

