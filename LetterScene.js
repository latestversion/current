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

    this.draw = function(graphics)
    {
        var ctx = canvas.getContext("2d")

        ctx.fillStyle = "white"
        ctx.fillRect(0,0,canvas.width,canvas.height)
        ctx.fillStyle = "rgba(255,0,255,0.3)"
        ctx.fillRect(0,0,canvas.width,canvas.height)



        var os = this.getObjects()
        for (var i = 0; i < os.length; i++)
        {
            os[i].draw(graphics)
        }
    }
}

LetterScene.prototype = {}

copyPrototype(Scene,LetterScene)