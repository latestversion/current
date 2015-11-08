var Log = {}

Log.logLevel = 3
Log.logGroups = []
Log.logFunc = console.log

Log.LG_SPAM = "LG_SPAM"

Log.log = function(text,level,group)
{

  if(!level)
  {
    level = 0
  }

  if(!group)
  {
    group = Log.LG_SPAM
  }

  if(level >= Log.logLevel)
  {
    var d = new Date()
    var timestamp = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds() + " "
    Log.logFunc( timestamp + text)
  }
}

function addConvenienceLoggers(obj)
{
  for (var i = 0; i < 10; i++)
  {
    var funcname = "l" + (i > 0 ? i : "")
    var logfunc = function(text,group)
    {
      Log.log(text, i, group)
    }

    obj[funcname] = logfunc

  }
}

addConvenienceLoggers(global)



l1("Yay ftw")
