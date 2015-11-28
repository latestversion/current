evalFile("Enums.js")

LG_ID_BNK = "LG_ID_BNK"

function IDRange(min,max,key)
{
  this.min = min
  this.max = max
  this.current = this.min
  this.returned = []
  this.key = key
}


IDRange.prototype.SetMin = function(min)
{
  this.min = min
}

IDRange.prototype.Min = function()
{
  return this.min
}

IDRange.prototype.SetMax = function(max)
{
  this.max = max
}

IDRange.prototype.Max = function()
{
  return this.max
}

IDRange.prototype.Key = function()
{
  return this.key
}

IDRange.prototype.GetFreeID = function()
{

  if(this.returned.length > 0)
  {
    return this.returned.shift()
  }

  if (this.current < this.max)
  {
    return this.current++
  }

  return 0
}

IDRange.prototype.ReturnID = function(id)
{
  if(id >= this.current)
  {
    throw "returned unallocated id " + id
  }

  this.returned.push(id)
}

IDRange.prototype.HasID = function(id)
{
  if (id >= this.Min() && id <= this.Max())
  {
    return true
  }

  return false
}


function IDBank()
{
  this.ranges = []
  var delta = 2000000
  for (var i = 0; i < TypeEnumsArray.length; i++)
  {
    this.ranges[i] = new IDRange(i*delta+1,i*delta,TypeEnumsArray[i])
    l1("IDBank: Created idrange for key " + TypeEnumsArray[i],LG_ID_BNK)
    l1("IDBank: Idrange is  " + JSON.stringify(this.ranges[i]),LG_ID_BNK)
  }
}


IDBank.prototype.GetFreeID = function(key)
{
  for(var k in this.ranges)
  {
    if (this.ranges[k].Key() == key)
    {
      return this.ranges[k].GetFreeID()
    }
  }

  l9("No id range for key " + key, LG_ID_BNK)
  return 0
}

IDBank.prototype.TypeForID = function(id)
{
  for(var k in this.ranges)
  {
    if (this.ranges[k].HasID(id))
    {
      return this.ranges[k].Key()
    }
  }
}

IDBank = new IDBank()


