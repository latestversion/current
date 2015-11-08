


function ArrayIterator(array)
{
  this.array = array
  this.idx = 0
}

ArrayIterator.prototype
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

