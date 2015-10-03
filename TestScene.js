
function TestScene(scenehandler,canvas)
{
    console.log("ctor testscene")
    Scene.call(this,scenehandler,canvas)

    var c = new Circle(50,50)
    this.addObject(c)
}

TestScene.prototype = {}

copyPrototype(Scene,TestScene)

