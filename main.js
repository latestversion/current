
var i = 3

// load all global stuff

if("node" == PLATFORM)
{
  // do node specific loading
  loadFile = function(){}
}


if("ios" == PLATFORM)
{
  // do the
}


function gameloop()
{

  console.log("i is now: " + i)
  if(i-- > 0)
  {
    setTimeout(gameloop,500)
  }
}

gameloop()


