jutil
=====

Simple JS Utils for Shell scripts

Pretty print to console log, prints stdin if JSON cannot be parsed
````
$ echo "{a:1,b:2}" | node -e "require('jutil').pretty()"
````

Diff two JS objects
````
$ echo "[$ONE,$TWO]" | node -e "console.log(require('./jutil.js').diff())"
````

Order attributes in JSON object array
````
var ord = require('./order.js');
var a = {'one': 1, "two": 2, "three": 3};
var b = {'two': 1, "one": 2, "three": 3};
var c = {'three': 1, "two": 2, "one": 3};

console.log(ord.orderAttr([a,b,c], ['one', 'two']));
````
