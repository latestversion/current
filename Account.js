
evalFile("HasArray.js",this)
evalFile("Entity.js",this)

function Account()
{
  Entity.call(this)
  HasArray.call(this,"characters")

  this.password = ""
  this.logintime = 0
  this.accesslevel = 1
  this.allowedcharacters = 1
  this.banned = false
}

var _p = Account.prototype

CopyPrototype(Entity,Account)
CopyProperties(HasArray.getPrototypeInstance("characters"),Account.prototype)

_p.Load = function(){}
_p.Save = function(){}
_p.Password = function(){}
_p.LoginTime = function(){}
_p.AccessLevel = function(){}
_p.Banned = function(){}
_p.AllowedCharacters = function(){}
_p.SetPass = function(pass){}
_p.SetLoginTime = function(t){}
_p.SetAccessLevel = function(lvl){}
_p.SetBanned = function(b){}
_p.SetAllowedCharacters = function(num){}
