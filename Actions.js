evalFile("Action")

function WorldDidStartAction()
{
  Action.call(this)
  this.name = "worlddidstartaction"
}

function QueryContainerAction()
{
  Action.call(this)
  this.name = "query"
  this.text = "iscontainer"
}

function InfoAction(text)
{
  Action.call(this)
  this.name = "info"
  this.text = text
}

function AttemptPutItemInContainerAction(cid,itemid,containerid)
{
  Action.call(this)
  this.name = "attemptputitemincontainer"
  this.cid = cid
  this.itemid = itemid
  this.containerid = containerid
}

function DidPutItemInContainerAction(cid,itemid,containerid)
{
  Action.call(this)
  this.name = "didputitemincontainer"
  this.cid = cid
  this.itemid = itemid
  this.containerid = containerid
}
