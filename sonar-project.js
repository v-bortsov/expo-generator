const sonarqubeScanner =  require('sonarqube-scanner');
sonarqubeScanner(
  {
    serverUrl:  'http://localhost:9000',
    token : '28987658813ef6ae33e0a2b13b705f59b5b7f53b',
    options : {
      'sonar.projectName': 'expo',
      'sonar.projectKey': 'expo',
      'sonar.projectDescription': 'Description for "My App" project...',
      'sonar.sources': 'src',
      // 'sonar.projectName': 'expo-bare',
      'sonar.login':  'admin',
      // 'sonar.password':  'frikandel',
      // 'sonar.sources':  'src',
      // 'sonar.tests':  'src',
      // 'sonar.inclusions'  :  '**', // Entry point of your code
      // 'sonar.test.inclusions':  'src/**/*.spec.js,src/**/*.spec.jsx,src/**/*.test.js,src/**/*.test.jsx',
      // 'sonar.javascript.lcov.reportPaths':  'coverage/lcov.info',
      // 'sonar.testExecutionReportPaths':  'coverage/test-reporter.xml'
    }
  },
  () => {
    console.log('>> Sonar analysis is done!');
  }
);

module.exports  = sonarqubeScanner;