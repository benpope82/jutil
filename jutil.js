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

module.exports = {
  pretty: pretty
}
