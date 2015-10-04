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

    var os = this.getObjects()
    for (var i = 0; i < os.length; i++)
    {
        //console.log("fhfh")
        os[i].update(dt)
    }
}

_p.draw = function(canvas)
    {
        var os = this.getObjects()
        for (var i = 0; i < os.length; i++)
        {
            os[i].draw(graphics)
        }
    }

_p.getSceneHandler = function()
{
    return this.scenehandler
}

_p.name = "ScenePrototype"

copyPrototype(ObjectHandler,Scene)
