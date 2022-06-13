const commands = require("./commands/index.js");

process.stdout.write("prompt > ");
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on("data", function (data) {
    var args = data.toString().trim().split(' '); //.trim() remueve la nueva línea
    var cmd = args.shift();
    const print = function (output) {
        process.stdout.write(output);
        process.stdout.write("\nprompt > ");
    }
    if (commands[cmd]) {
        commands[cmd](print, args);
    } else {
        print("cmd not found");
    }
});


