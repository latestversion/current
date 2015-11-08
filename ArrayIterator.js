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
