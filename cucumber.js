module.exports = {
    default: {
        require: ['support/**/*.js', 'step-definitions/**/*.js'],
        format: [
            'progress-bar',
            'html:reports/cucumber-report.html',
            'json:reports/cucumber-report.json'
        ],
        paths: ['features/**/*.feature'],
        parallel: 1
    }
}