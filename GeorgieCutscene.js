evalFile("CharacterFactory.js",this)
evalFile("Scene.js")
evalFile("Debug.js")

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

var georgietree = {
// Send in a  goddamn delegate to the functions so I won't have to type like a madman
// also no need to bind...
      start:function(){
          var stream = this.stream
          stream.putn()
          stream.putn()
          stream.putn("***Georgie cutscene***")
          stream.putn()
          stream.putn()
          stream.putn("G is ready to speak.")
          this.Wait(1000)
          this.Goto("ask")
        },
      ask:function(){
          this.GiveOptions("How about if you got me 10 carrots?",[
            new OptionInfo("1","Carrots it is!","accept_quest"),
            new OptionInfo("2","I think not...","deny_quest"),
            new OptionInfo("3","Hmm, maybe","ambivalent_quest")])
        },
      accept_quest:function(){
        var stream = this.Stream()
        stream.putn()
        stream.putn("Georgie puts some leaves in his pipe and smokes them.")
        stream.putn("'Good!' he wheezes between his teeth before he succumbs to a nasty coughing fit.\n")
        stream.putn("'Then it's... cough!cough! ...settled.'")
        this.Goto("exit")
      },
      deny_quest:function(){
        var stream = this.Stream()
        stream.putn("'That makes me sad...'")
        this.Goto("exit")
      },
      ambivalent_quest:function(){
        var stream = this.Stream()
        stream.putn("'Make up your mind you mongrel from the gutter!'")
        this.AnyKey("exit")
      },
      exit:function(){
        this.Wait(300)
        this.stream.putn("*")
        this.SceneHandler().PopScene()}
}


function GeorgieScene(scenehandler,stream,dialoguetree)
{
	Scene.call(this,scenehandler,stream)

	l1("Georgie cutscene starting.")

	this.state = CutsceneState.DoNode
  this.currentnode = "start"
	this.tree = georgietree
	this.optioninfos = []
	this.optionheader = ""
  this.certainDataImportantotreenodes = "tjohooo"
}

CopyPrototype(Scene,GeorgieScene)

var _p = GeorgieScene.prototype

_p.Wait = function(delay)
{
	main_platform_wait(delay)
}

_p.AnyKey = function(nextnode)
{
  this.state = CutsceneState.AnyKey
  this.currentnode = nextnode
  this.VoidInput()
}

_p.Goto = function(nextnode,wait)
{
  this.state = CutsceneState.DoNode
  this.currentnode = nextnode
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
    l1("nextnode name: " + this.currentnode)
    l1("nextnode" + this.tree[this.currentnode])
    var script = this.tree[this.currentnode]
    script = script.bind(this)
    script()
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
        l1("You choose! Gloriously! Very good! Hooray!")
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
