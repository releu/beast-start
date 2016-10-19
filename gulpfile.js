var gulp = require('gulp')
var minifyJS = require('gulp-minify')
var minifyCSS = require('gulp-minify-css')
var concat = require('gulp-concat')
var less = require('gulp-less')
var base64 = require('gulp-base64')
var beast = require('./lib/gulp-beast.js')
var autoprefixer = require('gulp-autoprefixer')
var plumber = require('gulp-plumber')
var fs = require('fs')

var http = require('http')
var pathJS = [
    './lib/beast.js',
    './lib/highlight.js',
    './system/blocks/*/*.js'
]
var pathCSS = [
    './lib/reset.css',
    './lib/highlight.css',
    './system/blocks/*/*.less'
]

var lessons = []
var fileNames = fs.readdirSync('./system/lessons/')
for (var i in fileNames) {
    var name = fileNames[i]
    if (parseInt(name).toString() == name) {
        lessons.push(parseInt(name).toString())
    }
}

gulp.task('js', function() {
    gulp.src(pathJS)
        .pipe(plumber())
        .pipe(beast())
        .pipe(concat('build.js'))
        .pipe(gulp.dest('./.build'))
})

gulp.task('css', function() {
    gulp.src(pathCSS)
        .pipe(plumber())
        .pipe(base64({
            extensions: ['svg'],
            maxImageSize: 10 *1024,
            debug: false
        }))
        .pipe(concat('build.css'))
        .pipe(less({
            paths: [__dirname],
            errLogToConsole: true
        }))
        .pipe(autoprefixer({
            browsers: ['iOS >= 7'],
            cascade: false
        }))
        .pipe(gulp.dest('./.build'))
})

var startScripts = ['js', 'css']
lessons.forEach(function(num){
    gulp.task('lesson-' + num + '-js', function(){
        gulp.src(['./lib/beast.js', './lessons/' + num + '/blocks/*/*.js'])
            .pipe(plumber())
            .pipe(beast())
            .pipe(concat('build.js'))
            .pipe(gulp.dest('./lessons/' + num + '/.build'))
    })
    startScripts.push('lesson-' + num + '-js')

    gulp.task('lesson-' + num + '-css', function() {
        gulp.src(['./lib/reset.css', './lessons/' + num + '/blocks/*/*.less'])
            .pipe(plumber())
            .pipe(concat('build.css'))
            .pipe(less({
                paths: [__dirname],
                errLogToConsole: true
            }))
            .pipe(gulp.dest('./lessons/' + num + '/.build'))
    })
    startScripts.push('lesson-' + num + '-css')
})

gulp.task('default', function() {
    gulp.start(startScripts)

    lessons.forEach(function(num){
        gulp.watch(
            ['./lessons/' + num + '/blocks/*/*.js'],
            ['lesson-' + num + '-js']
        )
        gulp.watch(
            ['./lessons/' + num + '/blocks/*/*.less'],
            ['lesson-' + num + '-css']
        )
    })

    gulp.watch(pathJS, ['js'])
    gulp.watch(pathCSS, ['css'])
})
