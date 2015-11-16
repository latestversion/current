function FullMatcher(text)
{
  this.text = text
}

var _p = FullMatcher.prototype

_p.Match = function(reftext)
{

}


function PartialMatcher(args)
{
  var inputtokens = (typeof args == 'string') ? args.split(" ") : args
  var regex = ""
  regex = "((\\s+)|(^))" + inputtokens.shift()
  for (var k in inputtokens)
  {
    regex += "\\S*?\\s+?" + inputtokens[k]
  }

  this.reggie = new RegExp(regex,"i")
}

var _p = PartialMatcher.prototype

_p.Match = function(reftext)
{
  return this.reggie.exec(reftext)
}
