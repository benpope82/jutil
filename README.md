jutil
=====

Simple JS Utils for Shell scripts

Pretty print to console log, prints stdin if JSON cannot be parsed
````
$ echo "{a:1,b:2}" | node -e "require('jutil').pretty()"
````
