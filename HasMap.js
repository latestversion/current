// Map<String,X>
// NOT FINISHED
function MapIterator(map)
{
  this.map = map
  this.array = Object.keys(map)
  this.idx = 0
}

MapIterator.prototype
var _p = MapIterator.prototype

_p.Next = function()
{
  if(this.idx >= this.array.length)
  {
    return undefined
  }

  return this.map[this.array[this.idx++]]
}


var hasMapPrototypes = {}

function HasMap(items)
{
  this[items] = {}
  this[items]["_count"] = 0
}

// NOT FINISHED

HasMap.getPrototypeInstance = function(items)
{

  if(hasMapPrototypes[items])
  {
    return hasMapPrototypes[items]
  }

  var Item = items[0].toUpperCase() + items.substring(1,items.length-1)
  var Items = items[0].toUpperCase() + items.substring(1)
  var _p = {}


  _p["Add" + Item] = function(key,value)
  {
    this[items][key] = value
    this[items]["_count"]++
  }

  _p["Del" + Item] = function(key)
  {
      delete this[items][key]
      this[items]["_count"]--
  }

  _p[Items + "Iterator"] = function()
  {
    return new MapIterator(this[items])
  }


  _p["Num" + Items] = function()
  {
    return this[items]["_count"]
  }

  _p["Has" + Item] = function(key)
  {
    return this[items][key]
  }

_p["Get" + Item] = function(key)
  {
    return this[items][key]
  }


  hasMapPrototypes[items] = _p

  return _p
}
