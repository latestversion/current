LG_CTOR_RGSTRY = "LG_CTOR_RGSTRY"

function CtorRegistry(registryname)
{
  Entity.call(this)
  this.SetName(registryname)
  this.ctors = {}
}

CopyPrototype(Entity,CtorRegistry)


CtorRegistry.prototype.Register = function(ctor)
{
  var loggroup = LG_CTOR_RGSTRY
  this.ctors[ctor.name] = ctor
  l1(this.Name() + ": Registered ctor " + ctor.name,loggroup)
}

CtorRegistry.prototype.Create = function(ctor,id)
{
  var name = ctor.name
  var loggroup = LG_CTOR_RGSTRY
  l1(this.Name() + ": Creating entity of type {0} with arg {1}".format(name,id),loggroup)

  if(undefined != this.ctors[name])
  {
    l1(this.Name() + ": Found ctor for name " + name,loggroup)
    return new this.ctors[name](id)
  }

  l9(this.Name() + ": No ctor named " + name,loggroup)
  return undefined
}

//Log.logGroups.push(LG_CTOR_RGSTRY)