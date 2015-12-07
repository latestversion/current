defaultscope = this
this.eval = eval
var evaledFiles = {}

evalFile = function(file)
{
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

  defaultscope.eval(s)
}