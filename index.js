const { Serve, Webpack, Typescript } = require("./tasks");

// tasks child
const childs = [
    Serve(),
    Webpack(),
    Typescript()    
];



process.on('SIGINT', function() {
    for( let i = 0; i < childs.length; ++i ) {
        if ( !childs[i].killed )
            childs[i].kill();
    }
});
