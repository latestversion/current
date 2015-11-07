
function CopyPrototype(fromclass,toclass)
{
    var fromp = fromclass.prototype
    var top = toclass.prototype

    //console.log("Copying from " + fromp.name + " to " + top.name)

    for (var key in fromp)
    {
        if (top.hasOwnProperty(key))
        {
            //console.log("Property overwritten: " + key)
        }
        else
        {
            //console.log("copying prop " + key)

        }
        top[key] = fromp[key]
    }

}

function CopyProperties(fromobj,toobj)
{
    var from = fromobj
    var to = toobj

    for (var key in from)
    {
        to[key] = from[key]
    }
}



function Entity()
{
  this.id = 0
  this.name = ""
  this.description = ""
  this.ctor = this.constructor.name
  console.log(this.ctor)
}


var _p = Entity.prototype = {}


_p.Name = function()
{return this.name}

_p.Description = function()
{return this.description}


_p.ID = function()
{return this.id}


_p.SetName = function(n)
{this.name = n}

_p.SetDescription = function(d)
{this.description = d}


_p.SetID = function(id)
{this.id = id}



function ArrayIterator(array)
{
  this.array = array
  this.idx = 0
}

ArrayIterator.prototype = {}
var _p = ArrayIterator.prototype

_p.Next = function()
{
  if(this.idx >= this.array.length)
  {
    return false
  }

  return this.array[this.idx++]
}


var hasContainerPrototypes = {}

function HasArray(items)
{

  this[items] = []
}

HasArray.getPrototypeInstance = function(items)
{

  if(hasContainerPrototypes[items])
  {
    return hasContainerPrototypes[items]
  }

  var Item = items[0].toUpperCase() + items.substring(1,items.length-1)
  var Items = items[0].toUpperCase() + items.substring(1)
  var _p = {}


  _p["Add" + Item] = function(id)
  {
    this[items].push(id)
  }

  _p["Del" + Item] = function(id)
  {
    var idx = this[items].indexOf(id)
    if(-1 != idx)
    {
      this[items].splice(idx,1)
    }

  }

  _p[Items + "Iterator"] = function()
  {
    return new ArrayIterator(this[container])
  }


  _p["Num" + Items] = function()
  {
    return this[items].length
  }


  _p["Begin" + Items] = function()
  {
    this[items].idx = 0
  }

  _p["IsValid" + Item] = function()
  {
    return this[items].idx < this[items].length ? true : false
  }

  _p["Current" + Item] = function()
  {
    return this[items][this[items].idx]
  }

  _p["Next" + Item] = function()
  {
    this[items].idx++
  }


  hasContainerPrototypes[items] = _p

  return _p
}



function HasRooms()
{
  HasArray.call(this,"rooms")
}

var _p = HasRooms.prototype = {}

CopyProperties(HasArray.getPrototypeInstance("rooms"),HasRooms.prototype)




function Place()
{
  this.type = this.constructor.name
}


function Region()
{

  Place.call(this)
  this.r = 8
  //HasRooms.call(this)
}


console.log(JSON.stringify(Region.prototype))
//Region.ENUM = 4

//var _p = Region.prototype = {}

//CopyPrototype(Place,Region)
//CopyPrototype(HasRooms,Region)



var r = new Region()
console.log(r.type)




