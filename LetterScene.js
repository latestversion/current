function LetterScene(text,scenehandler,canvas)
{
    Scene.call(this,scenehandler,canvas)

    var t = new Text(text,alphabet,canvas)

    var triangles = Utils.textObjectToTriangles(t)

    for(var i = 0; i < triangles.length;i++)
    {
        tri = triangles[i]
        this.addObject(tri)
    }

    var flockctrl = new FlockController(triangles,canvas)

    this.addObject(flockctrl)

    this.draw = function(graphics)
    {
        var ctx = canvas.getContext("2d")

        ctx.fillStyle = "rgb(255,200,255)"
        ctx.fillRect(0,0,canvas.width,canvas.height)

        var os = this.getObjects()
        for (var i = 0; i < os.length; i++)
        {
            os[i].draw(graphics)
        }
    }

    this.update = function(dt)
    {
        var os = this.getObjects()
        for (var i = 0; i < os.length; i++)
        {
            os[i].update(dt)
        }
    }
}

LetterScene.prototype = {}

copyPrototype(Scene,LetterScene)