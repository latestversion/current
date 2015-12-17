

function Log()
{
  this.loglevel = 1
  this.loggroups = []
  this.logfunc = console.log
}

Log.prototype.log = function(text,level,group)
{
  if(!level)
  {
    level = 0
  }

  if(!group)
  {
    group = LG_SPAM
  }

  if(9 == level)
  {
    throw text
  }

  if(this.loggroups.length && (-1 == this.loggroups.indexOf(group)))
  {
    return
  }

  if(level >= this.loglevel)
  {
    var d = new Date()
    var timestamp = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ":" + d.getMilliseconds() + " "
    this.logfunc( timestamp + text)
  }
}

Log.prototype.AddGroup = function(group)
{
  this.loggroups.push(group)
}

LG_SPAM = "LG_SPAM"
LG_ERR = "LG_ERR"
LG_DB_CHECK = "LG_DB_CHECK"
LG_DB = "LG_DB"
LG_TIME = "LG_TIME"
LG_EVAL = "LG_EVAL"
LG_ACTIONS = "LG_ACTIONS"

var Log = new Log()

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

l1("Yay, Log ftw!")
