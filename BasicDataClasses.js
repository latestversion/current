// All of these for storing ids

/* HasRoom */
function HasRoom()
{
  this.room = 0
}

HasRoom.prototype = {}
var _p = HasRoom.prototype

_p.Room = function()
{
  return this.room
}

_p.SetRoom = function(room)
{this.room = room}


/* HasRegion */
function HasRegion()
{
  this.region = 0
}

HasRegion.prototype = {}
var _p = HasRegion.prototype

_p.Region = function()
{
  return this.region
}

_p.SetRegion = function(region)
{this.region = region}


/* HasTemplate */
function HasTemplate()
{
  this.template = 0
}


HasTemplate.prototype = {}
var _p = HasTemplate.prototype

_p.Template = function()
{
  return this.template
}

_p.SetTemplate = function(template)
{this.template = template}

