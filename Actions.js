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

function QueryCanAttackAction(cid)
{
  Action.call(this)
  this.arg1 = cid
  this.cid = cid
  this.name = QueryCanAttackAction.Name
  this.text = QueryCanAttackAction.Name
}
QueryCanAttackAction.Name = "canattack"

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

function AttemptGetItemAction(cid,itemid)
{
  Action.call(this)
  this.name = AttemptGetItemAction.Name
  this.cid = cid
  this.itemid = itemid
}
AttemptGetItemAction.Name = "attemptgetitem"

function AttemptAttackAction(cid,targetid)
{
  Action.call(this)
  this.name = AttemptAttackAction.Name
  this.cid = cid
  this.targetid = targetid
}
AttemptAttackAction.Name = "attemptattack"

function MessageLogicAction(typeenum,targetid,text)
{
  Action.call(this)
  this.name = MessageLogicAction.Name
  this.arg1 = typeenum
  this.arg2 = targetid
  this.targetid = targetid
  this.text = text
}
MessageLogicAction.Name = "messagelogic"

function EventAction(text,id,scope)
{
  Action.call(this)
  this.name = EventAction.Name
  this.scope = scope
  this.arg1 = id
  this.text = text
  this.event = text
}
EventAction.Name = "event"

function SayAction(cid,text)
{
  Action.call(this)
  this.name = SayAction.Name
  this.text = text
  this.arg1 = cid
  this.cid = cid
}
SayAction.Name = "say"

function MoveAction(cid,direction)
{
  Action.call(this)
  this.name = MoveAction.Name
  this.arg1 = cid
  this.text = direction
}
MoveAction.Name = "move"

function ShoutAction(cid,text)
{
  Action.call(this)
  this.name = "shout"
  this.cid = cid
  this.text = text
}
