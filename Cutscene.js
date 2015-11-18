evalFile("CharacterFactory.js",this)
evalFile("Scene.js")
evalFile("Debug.js")
evalFile("CutsceneProxy.js")

CutsceneState = {}
CutsceneState.DoNode = "CutsceneState.DoNode"
CutsceneState.WaitForOption = "CutsceneState.WaitForOption"
CutsceneState.AnyKey = "CutsceneState.AnyKey"

function OptionInfo(name,presentation,nextnode)
{
	this.name = name
	this.presentation = presentation
	this.nextnode = nextnode
}


function Cutscene(scenehandler,stream,nodes)
{
	Scene.call(this,scenehandler,stream)

	this.state = CutsceneState.DoNode
  this.currentnode = "start"
	this.nodes = nodes
	this.optioninfos = []
	this.optionheader = ""
}

CopyPrototype(Scene,Cutscene)

var _p = Cutscene.prototype

_p.Wait = function(delay)
{
	main_platform_wait(delay)
}

_p.Done = function()
{
  this.SceneHandler().PopScene()
}

_p.NewCutsceneProxy = function()
{
  var p = new CutsceneProxy()
  p.AnyKey = this.AnyKey.bind(this)
  p.Wait = this.Wait.bind(this)
  p.Text = this.stream.put.bind(this.stream)
  p.Line = this.stream.putn.bind(this.stream)
  p.GiveOptions = this.GiveOptions.bind(this)
  p.Done = this.Done.bind(this)
  p.Goto = this.Goto.bind(this)

  return p
}


_p.AnyKey = function(tonode)
{
  this.state = CutsceneState.AnyKey
  this.currentnode = tonode
  this.VoidInput()
}

_p.Goto = function(tonode,wait)
{
  this.state = CutsceneState.DoNode
  this.currentnode = tonode
  if(wait)
  {
    this.Wait(wait)
  }
}

_p.VoidInput = function()
{
  while(this.Stream().get()){}
}

_p.PrintOptions = function()
{
  var optioninfos = this.optioninfos
  var stream = this.Stream()
  stream.putn(this.optionheader)
  for(var k in optioninfos)
  {
    var info = optioninfos[k]
    stream.put(info.name + ".")
    stream.putn(info.presentation)
  }
}

_p.GiveOptions = function(header,optioninfos)
{
  this.VoidInput()
	l1("I was given {0} optioninfos".format(optioninfos.length))
  l1("OptionInfos: ".format(JSON.stringify(optioninfos)))
	var stream = this.stream

  this.optionheader = header
  this.optioninfos = optioninfos

  this.PrintOptions()

  l1("Starting to wait for options")
  this.state = CutsceneState.WaitForOption
}

_p.Tick = function(input)
{

  if(CutsceneState.DoNode == this.state)
  {
    this.VoidInput()
    l1(this.state)
    l1("currentnode name: " + this.currentnode)
    l1("currentnode" + this.nodes[this.currentnode])
    var script = this.nodes[this.currentnode]
    var proxy = this.NewCutsceneProxy()
    script(proxy)
  }
  else if(CutsceneState.AnyKey == this.state && input)
  {
    l1(this.state + " with input")
    this.state = CutsceneState.DoNode
  }
	else if(CutsceneState.WaitForOption == this.state)
  {
    if(!input)
    {
      return
    }

    for(var k in this.optioninfos)
    {
      if(this.optioninfos[k].name == input)
      {
        l1("Option {0} accepted ".format(input))
        this.currentnode = this.optioninfos[k].nextnode
        l1("next node: " + this.currentnode)
        this.state = CutsceneState.DoNode
        return
      }
    }

    this.PrintOptions()
  }
}
