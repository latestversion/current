evalFile("CharacterFactory.js",this)
evalFile("Scene.js")
evalFile("Debug.js")

CutsceneState = {}
CutsceneState.DoNode = 0
CutsceneState.WaitForOption = 1

function OptionInfo(name,presentation,nextnode)
{
	this.name = name
	this.presentation = presentation
	this.nextnode = nextnode
}


function GeorgieScene(scenehandler,stream,dialoguetree)
{
	Scene.call(this,scenehandler,stream)

	l1("Georgie cutscene starting.")

	this.state = CutsceneState.DoNode
  this.currentnode = ""
	this.tree = dialoguetree
	this.optioninfos = []
	this.optionheader = ""
  this.certainDataImportantotreenodes = "tjohooo"


  stream.putn()
  stream.putn()
  stream.putn("***Georgie cutscene***")
  stream.putn()
  stream.putn()
  stream.putn("G spits on the ground")
  this.Wait(500)
  stream.putn("G is ready to speak.")
  this.Wait(1000)
  this.GiveOptions("How about if you got me 10 carrots?",[
    new OptionInfo("1","Carrots it is!","accept_quest"),
    new OptionInfo("2","I think not...","deny_quest"),
    new OptionInfo("3","Hmm, maybe","ambivalent_quest")])
}

CopyPrototype(Scene,GeorgieScene)

var _p = GeorgieScene.prototype

_p.Wait = function(delay)
{
	main_platform_wait(delay)
}


_p.PrintOptions = function()
{
  var optioninfos = this.optioninfos
  var stream = this.Stream()
  stream.putn(this.optionheader)
  for(var k in optioninfos)
  {
    l1("OptionInfo {0}: {1}".format(k,JSON.stringify(optioninfos[k])))
      var info = optioninfos[k]
    stream.put(info.name + ".")
    stream.putn(info.presentation)
  }
}

_p.GiveOptions = function(header,optioninfos)
{
	l1("I was given {0} optioninfos".format(optioninfos.length))
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
  }

	if(CutsceneState.WaitForOption == this.state)
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
        this.state = CutsceneState.DoNode
        return
      }
    }

    this.PrintOptions()
  }



}
