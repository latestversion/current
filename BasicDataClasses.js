// All of these for storing ids

/* HasIte*/

function HasItem()
{
  this.item = 0
}

HasItem.prototype
var _p = HasItem.prototype

_p.Item = function()
{
  return this.item
}

_p.SetItem = function(item)
{this.item = item}


/* HasRoom */
function HasRoom()
{
  this.room = 0
}

HasRoom.prototype
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

var _p = HasRegion.prototype

_p.Region = function()
{
  return this.region
}

_p.SetRegion = function(region)
{this.region = region}



function HasCharacter()
{
  this.character = 0
}

var _p = HasCharacter.prototype
_p.SetCharacter = function(cid)
{
  this.character = cid
}
_p.Character = function()
{
  return this.character
}

/* HasTemplate */
function HasTemplate()
{
  this.templateid = 0
}


HasTemplate.prototype
var _p = HasTemplate.prototype

_p.TemplateID = function()
{
  return this.templateid
}

_p.SetTemplateID = function(templateid)
{this.templateid = templateid}

