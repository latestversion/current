function Scene(scenehandler,canvas)
{
    console.log("ctor scene")
    ObjectHandler.call(this)
    this.scenehandler = scenehandler
    this.canvas = canvas
}

Scene.prototype = {}

var _p = Scene.prototype

_p.update = function(dt)
{
    throw "Implement Scene update plz"
}

_p.draw = function(canvas)
{
    throw "Implement Scene draw plz"
}

_p.getSceneHandler = function()
{
    return this.scenehandler
}

_p.name = "ScenePrototype"

copyPrototype(ObjectHandler,Scene)
