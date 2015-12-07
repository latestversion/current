function Scene(scenehandler,stream)
{
	this.scenehandler = scenehandler
	this.stream = stream
}

var _p = Scene.prototype

_p.Tick = function(input)
{
	throw "Abstract Tick not implemented in Scene"	
}

_p.SceneHandler = function()
{
	return this.scenehandler
}


_p.Stream = function()
{
	return this.stream
}

console.log("Exciting times indeed!")
