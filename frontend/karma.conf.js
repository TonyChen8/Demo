//jshint strict: false
module.exports = function (config) {
    //noinspection JSFileReferences
    config.set({

        //urlRoot:"/",

        basePath: './main',

        files: [
            "bower_components/angular/angular.js",
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/jasmine-core/lib/jasmine-core/jasmine.js',

            '!(bower_components)/**/*!(.module|.spec).js',
            '**/*_spec.js'

            //for templateUrl test
            //https://github.com/karma-runner/karma-ng-html2js-preprocessor
            //'*.html',
            //'**/*.html',
            //end for templateUrl test
        ],

        exclude: [
            "**/testdirectives.js",
            "**/uiRouterTest.js"
        ],
        //preprocessors: {
        //    'js/**/phone*.html': 'ng-html2js',
        //    //'js/**/*.js': 'coverage',
        //},
        //ngHtml2JsPreprocessor: {
        // strip this from the file path
        //stripPrefix: 'app/',//html路径的前缀
        //stripSuffix: '',//html路径的后缀
        //// prepend this to the
        //prependPrefix: 'js/phone-list',//服务器上的路径

        //// or define a custom transform function
        //// - cacheId returned is used to load template
        ////   module(cacheId) will return template at filepath
        //cacheIdFromPath: function (filepath) {
        //    // example strips 'public/' from anywhere in the path
        //    // module(app/templates/template.html) => app/public/templates/template.html
        //    var cacheId = filepath.strip('public/', '');
        //    return cacheId;
        //},

        //// - setting this option will create only a single module that contains templates
        ////   from all the files, so you can load them all with module('foo')
        //// - you may provide a function(htmlPath, originalPath) instead of a string
        ////   if you'd like to generate modules dynamically
        ////   htmlPath is a originalPath stripped and/or prepended
        ////   with all provided suffixes and prefixes
        //moduleName: 'phone-list.template.html'
        //},
        //for templateUrl end

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: [
            'Chrome',
            //'Firefox'
        ],

        //for coverage
        //reporters: ['progress', 'coverage'],
        //coverageReporter: {
        //  type: 'html',
        //  dir: 'coverage/'
        //}
        //end for coverage
    });
};
