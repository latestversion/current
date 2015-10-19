


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

function HasContainer(items)
{

  this[items] = []
}

HasContainer.getPrototypeInstance = function(items)
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

  hasContainerPrototypes[items] = _p

  return _p
}

