const { type } = require('os');

const exec = require('child_process').exec;

function runTask(command, onExit) {
    let child = exec(command);
    child.stdout.pipe(process.stdout);

    child.on('exit', () => {
        if ( typeof onExit === 'function' )
            onExit();
        else
            process.stdout.write('Closing task ' + command);
    });

    return child;
}

module.exports = {
    Serve: function() {
        return runTask('serve ./public', () => process.stdout.write('HTTP server closed.\n'))
    },
    
    Webpack: function() {
        return runTask('webpack --w', () => process.stdout.write('wp task closed\n'))
    },

    Typescript: function() {
        return runTask('tsc --w', () => process.stdout.write('tsc task closed.\n'))
    }
}