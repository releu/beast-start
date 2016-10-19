var express = require('express'),
    app     = express(),
    https   = require('http'),
    request = require('request'),
    fs      = require('fs'),
    marked  = require('marked'),
    cookieParser = require('cookie-parser')

app.use(cookieParser())

var pageWrapper = function(bml, params){
    var schoolBlock = '<School'
    var lessonsCount = 0

    var fileNames = fs.readdirSync('./system/lessons/')
    for (var i in fileNames) {
        var name = fileNames[i]
        if (parseInt(name).toString() == name) {
            lessonsCount += 1
        }
    }
    schoolBlock += ' lessons-count="' + lessonsCount + '"'
    if (params){
        for(var key in params) {
            var value = params[key]
            schoolBlock += ' ' + key + '="' + value + '"'
        }
    }
    schoolBlock += '>'
    return (
        '<!DOCTYPE html>' +
        '<html>' +
            '<head>' +
                '<meta charset="utf-8">' +
                '<script type="text/javascript" src="/.build/build.js"></script>' +
                '<link type="text/css" rel="stylesheet" href="/.build/build.css">' +
            '</head>' +
            '<body>' +
                '<script type="bml">' + schoolBlock + bml + '</School></script>' +
            '</body>' +
        '</html>'
    )
}

var getLessonNumFromUrl = function(url) {
    return url.match(/lessons\/([\d]+)/)[1]
}

var saveLastLessonNumber = function(res, number) {
    res.cookie('lessonNumber', number, { maxAge: 900000 })
}

app.get('/', function(req, res) {
    var lessonNumber = '1'
    if (req.cookies.lessonNumber) {
        lessonNumber = req.cookies.lessonNumber
    }
    res.redirect('/lessons/' + lessonNumber)
})

app.get(/lessons\/([\d]+)\/$/, function(req, res) {
    var num = getLessonNumFromUrl(req.url)
    saveLastLessonNumber(res, num)
    var templatePath = __dirname + '/system/lessons/' + num + '/lesson.md'

    var renderer = new marked.Renderer()
    renderer.image = function(href, title, text) {
        href = '/system/lessons/' + num + '/' + href
        var out = '<img src="' + href + '" alt="' + text + '"></img>'
        return out;
    }
    renderer.code = function(code, lang){
        var entityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;',
            '{': '&#123;',
            '}': '&#125;',
            '(': '&#40;',
            ')': '&#41;'
        }

        function escapeHtml(string) {
            return String(string).replace(/[&<>"'{}\(\)\/]/g, function (s) {
              return entityMap[s]
            })
        }

        var out = '<pre><code lang="' + lang + '">'
        code.split('\n').forEach(function(line){
            var escaped = escapeHtml(line)
            out += escaped
            out += '\\n'
        })
        out += '\n</code></pre>'

        return out
    }

    fs.readFile(templatePath, 'utf-8', function(_, data){
        var html = '<task>' + marked(data, { renderer: renderer }) + '</task>'
        res.send(pageWrapper(html, { lesson: num }))
    })
})

app.use('/.build', express.static('.build'))
app.use('/lessons', express.static('lessons'))
app.use('/system', express.static('system'))
app.use('/assets', express.static('assets'))
app.use('/lib', express.static('lib'))

var server = app.listen(3052, function() {
    var host = server.address().address
    var port = server.address().port

    process.stdout.write('\033c');

    var animals = ['🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐼', '🐨', '🐯',
        '🦁', '🐮', '🐷', '🐸', '🐙', '🐿', '🐇', '🐉', '🐒', '🐔', '🐧',
        '🐦', '🐤', '🐥', '🐺', '🐗', '🐴', '🦄', '🐝', '🐌', '🐞', '🕷',
        '🦀', '🐞', '🐍', '🐢', '🐬', '🐠', '🐋', '🐳', '🐅', '🐃',
        '🐂', '🐘', '🐄', '🐫', '🐪', '🐐', '🐏', '🐑', '🐎', '🐖', '🐀',
        '🐁', '🐓', '🦃', '🕊', '🐕', '🐩', '🐈']

    var animal = animals[Math.floor(Math.random() * animals.length)]
    console.log('-> http://localhost:' + port + ' ' + animal)
})
