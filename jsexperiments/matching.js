
items = ["a big goblin","A Big Goblin","a red goblin","the fantastic mersh","the little mermaid",
"the little fantastic mermaid","the big mermaid",
"tyger tyger burning bright","rascal","roscal","a fab journey to gibraltar","a fab journey to helsinki"]

var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



function PartialMatcher(text)
{

  var inputtokens = text.split(" ")
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




function partialmatch(reference,input)
{
  var inputtokens = input.split(" ")
  var regex = ""
  regex = "((\\s+)|(^))" + inputtokens.shift()
  for (var k in inputtokens)
  {
    regex += "\\S*?\\s+?" + inputtokens[k]
  }

  var reggie = new RegExp(regex,"i") // i for case insensitive
  var result = reggie.exec(reference)

  //console.log(result)
  console.log(regex)
return result


}

rl.on('line', function (cmd) {
  if(cmd == "q")
  {
    process.exit()
  }
  console.log('You just typed: '+cmd);
  console.log(items)
  var pmatcher = new PartialMatcher(cmd)
  for(var k in items)
  {
    var result = pmatcher.Match(items[k])
    if (result)
    {
      console.log(cmd + " matched " + items[k])
    }
  }
});

