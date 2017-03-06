evalFile("LogicEntity.js")
evalFile("Logic.js")
evalFile("Actions")

function ContainerLogic(ownerid)
{
  Logic.call(this,ownerid)
  this.SetName("ContainerLogic")
}

var _p = ContainerLogic.prototype

CopyPrototype(Logic,ContainerLogic)

_p.DoAction = function(a)
{
  l1("ContainerLogic DoAction")

  var queryAction = new QueryContainerAction()

  if(a.name == queryAction.name)
  {
    l1("ContainerLogic: There was a query for being a container. As it happens, I am. ",LG_SPAM)
    return false
  }

  return true
}

RegisterLogic(ContainerLogic)
