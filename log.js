var Log = {}

Log.logLevel = 1
Log.logGroups = []
Log.logFunc = console.log

LG_SPAM = "LG_SPAM"
LG_ERR = "LG_ERR"
LG_DB_CHECK = "LG_DB_CHECK"
LG_DB = "LG_DB"

Log.log = function(text,level,group)
{

  if(!level)
  {
    level = 0
  }

  if(!group)
  {
    group = LG_SPAM
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
