var SceneHandler = function(inputstream)
{
	this.stream = inputstream
	this.scenes = [];
}

var _p = SceneHandler.prototype

_p.PushScene = function(scene)
{
	this.scenes.push(scene);
}
_p.PopScene = function()
{
	return this.scenes.pop();
}
_p.ClearScenes = function()
{
	this.scenes = [];
}
_p.CurrentScene  = function()
{
	var numScenes = this.scenes.length;
	if(numScenes)
	{
		return this.scenes[numScenes-1];
	}

	return null;
}

_p.ReplaceCurrentScene = function(scene)
{
	this.PopScene()
	this.PushScene(scene)
}

_p.Tick = function()
{
  	var input = this.stream.get()
	var currentScene = this.CurrentScene()
	if(currentScene)
	{
	  currentScene.Tick(input)
	}
}

_p.VoidInput = function()
{
	while(this.stream.get())
	{

	}
}
