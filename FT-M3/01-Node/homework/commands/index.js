var fs = require("fs");
var request = require('request');

function pwd(print) {
  print(process.cwd());
}

function date(print) {
  print(Date());
}

function ls(print) {
  fs.readdir(".", function (err, files) {
    if (err) throw err;
    print(files.join('\n'));
  });
}

function echo(print, args) {
  print(args.join(" "));
}

function cat(print, args){
  fs.readFile(args[0], 'utf8', function(err, data){
    if (err) throw err;
    print(data);
  });
}

function head(print, args){
  fs.readFile(args[0], 'utf8', function(err, data){
    if (err) throw err;
    print(data.split('\n').splice(0, 5).join('\n'));
  });
}

function tail(print, args){
  fs.readFile(args[0], 'utf8', function(err, data){
    if (err) throw err;
    print(data.split('\n').splice(-10).join('\n'));
  });
}

function curl(print, args){
  request(args[0], function(err, data){
    if (err) throw err;
    print(data.body);
  });
}

module.exports = {
  pwd,
  date,
  ls,
  echo,
  cat,
  head,
  tail,
  curl,
};
