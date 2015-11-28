evalFile("Region.js")

function RegionFactory()
{
  Entity.call(this)
  this.SetName("RegionFactory")
}

CopyPrototype(Entity,RegionFactory)

RegionFactory.prototype.Create = function(tid,id)
{
  l1(this.Name() + ": Creating a region with id " + id)
  var r =  new Region()
  r.SetID(id)
  return r
}
