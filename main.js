
var i = 3
var evalFile = null

// load all global stuff

if("node" == PLATFORM)
{
  // do node specific loading
  evalFile = function(file,refscope){
  {
    var s = fs.readFileSync(file,"ascii")
    refscope.eval(s)}
  }
}

if("ios" == PLATFORM)
{
  evalFile = function(file,refscope){
  {
    var s = fs.readFileSync(file,"ascii")
    refscope.eval(s)}
  }
}


var inbuffer = ""
var outbuffer = ""

function gameloop()
{

  console.log("i is now: " + i)
  if(i-- > 0)
  {
    setTimeout(gameloop,500)
  }
}

gameloop()


