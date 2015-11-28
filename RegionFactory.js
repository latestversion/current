evalFile("Region.js")

function RegionFactory()
{

}

RegionFactory.prototype.Create = function(tid,id)
{
  var r =  new Region()
  r.SetID(id)
  return r
}
