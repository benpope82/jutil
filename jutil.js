function pretty(obj){
  if(!obj){
    var indata = '';
    process.stdin.on('readable', function(){
      indata += process.stdin.read() || '';
    })
    process.stdin.on('end', function(){
      printit(indata)
    });
  } else {
     printit(obj);
  }

  function printit(s){
    try{
      console.log(JSON.stringify(JSON.parse(s), null, 2)); 
    } catch(e){
      console.log(s);
    }
  }
}

var deepDiffMapper = function() {
    return {
        VALUE_CREATED: '>',
        VALUE_UPDATED: '>>',
        VALUE_DELETED: '-',
        VALUE_UNCHANGED: '=',
        map: function(obj1, obj2) {
            if (this.isFunction(obj1) || this.isFunction(obj2)) {
                throw 'Invalid argument. Function given, object expected.';
            }
            if (this.isValue(obj1) || this.isValue(obj2)) {
              var a = {};
                a[this.compareValues(obj1, obj2)] = obj1 || obj2;
                return a;
            }
            var diff = {};
            for (var key in obj1) {
                if (this.isFunction(obj1[key])) {
                    continue;
                }

                var value2 = undefined;
                if ('undefined' != typeof(obj2[key])) {
                    value2 = obj2[key];
                }

                diff[key] = this.map(obj1[key], value2);
            }
            for (var key in obj2) {
                if (this.isFunction(obj2[key]) || ('undefined' != typeof(diff[key]))) {
                    continue;
                }

                diff[key] = this.map(undefined, obj2[key]);
            }
            return diff;

        },
        compareValues: function(value1, value2) {
            if (value1 === value2) {
                return this.VALUE_UNCHANGED;
            }
            if ('undefined' == typeof(value1)) {
                return this.VALUE_CREATED;
            }
            if ('undefined' == typeof(value2)) {
                return this.VALUE_DELETED;
            }

            return this.VALUE_UPDATED;
        },
        isFunction: function(obj) {
            return toString.apply(obj) === '[object Function]';
        },
        isArray: function(obj) {
            return toString.apply(obj) === '[object Array]';
        },
        isObject: function(obj) {
            return toString.apply(obj) === '[object Object]';
        },
        isValue: function(obj) {
            return !this.isObject(obj) && !this.isArray(obj);
        }
    }
}();

module.exports = {
  pretty: pretty,
  diff: function(a, b){
    if(a && b){
      if(typeof a === 'object')
        a = JSON.stringify(a);
      if(typeof b === 'object')
        b = JSON.stringify(b);    
      return deepDiffMapper.map(a, b);
    }
    var indata = '';
    process.stdin.on('readable', function(){
      indata += process.stdin.read() || '';
    })
    process.stdin.on('end', function(){
      var arr = JSON.parse(indata);
      console.log(deepDiffMapper.map(arr[0], arr[1]));
    });
  }
}
