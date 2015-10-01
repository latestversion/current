
function TestScene(scenehandler,canvas)
{
    console.log("ctor testscene")
    Scene.call(this,scenehandler,canvas)

    var c = new Circle(50,50)
    this.addObject(c)

    this.update = function(dt)
    {
        var os = this.getObjects()
        for (var i = 0; i < os.length; i++)
        {
            os[i].update(dt)
        }
    }

    this.draw = function(ctx)
    {
        var os = this.getObjects()
        for (var i = 0; i < os.length; i++)
        {
            os[i].draw(ctx)
        }
    }
}

TestScene.prototype.name = "TestScenePrototype"

for (var key in Scene.prototype)
    {
        //console.log("Scene proto prop " + key)
    }

copyPrototype(Scene,TestScene)

