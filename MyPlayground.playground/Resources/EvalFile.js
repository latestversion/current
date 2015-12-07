
var evaledFiles = {}
var xeval = eval // want indirect call so that stuff goes to global scope
// http://www.2ality.com/2014/01/eval.html
// http://perfectionkills.com/global-eval-what-are-the-options/
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

  xeval(s)
}