var through = require('through2')
var beast = require('./beast.js')

module.exports = function() {
    return through.obj(function(file, encoding, cb) {
        if (file.isNull()) {
            return cb(null, file)
        }

        if (file.isStream()) {
            return cb(new PluginError('gulp-beast', 'Streaming not supported'))
        }

        var parts = file.path.split('.')
        if (parts[parts.length - 2] === 'bml' && parts[parts.length - 1] === 'js') {
            file.contents = new Buffer(
                Beast.parseBML(
                    file.contents.toString()
                )
            )
        }

        cb (null, file)
    })
}
