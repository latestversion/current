function Scene(scenehandler,outstream)
{
	this.sceneHandler = scenehandler
	this.stream = outstream
}

var _p = Scene.prototype = {}

_p.onInput = function()
{
	throw "Abstract oninput not implemented in Scene"	
}