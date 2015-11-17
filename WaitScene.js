
evalFile("CharacterFactory.js",this)
evalFile("Scene.js")

function WaitScene(scenehandler,waittime)
{
	l1("WaitScene " + waittime)
	if(!waittime)
	{
		waittime = 1000
	}
	Scene.call(this,scenehandler,stream)
	this.waittime = waittime
	this.starttime = Date.now()
}

var _p = WaitScene.prototype

CopyPrototype(Scene,WaitScene)

_p.Tick = function(input)
{
	if(Date.now() - this.starttime > this.waittime)
	{
		this.SceneHandler().PopScene()
	}
}