var evaledFiles = {}

evalFile = function(file,refscope)
{
  //console.log(evaledFiles)
  if(evaledFiles[file])
  {
    return
  }

  evaledFiles[file] = true

  if(typeof l1 !== "undefined")
  {
    l1("evaling file " + file,LG_EVAL)
  }
  
  var s = readFile(file,"ascii")

  if(refscope)
  {
    refscope.eval(s)
  }
  else
  {
    defaultscope.eval(s)
  }
}