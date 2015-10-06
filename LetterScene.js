function LetterScene(text,scenehandler,canvas)
{
    Scene.call(this,scenehandler,canvas)
    EventEmitter.call(this)


    this.backgroundFillStyle = "rgb(255,200,255)"

    var t = new Text(text,alphabet,canvas)

    var trianglePaths = Utils.textObjectToTrianglePaths(t)

    var triangles = []

    for(var i = 0; i < trianglePaths.length; i++)
    {
        var path = trianglePaths[i]
        var midpoint = Path.avgPoint(path)
        Path.setRelativeToPoint(path,midpoint)
        triangles[i] = new Triangle(midpoint,trianglePaths[i],this)
    }

    // Add color and randomize position
    for(var i = 0; i < triangles.length;i++)
    {
        tri = triangles[i]
        tri.color = ColorBank.getRandom("pink")
        tri.position.x = Math.random()*canvas.width
        tri.position.y = Math.random()*canvas.height
        //this.addObject(tri)
        var vision = new TriangleVision(tri)
        //this.addObject(vision)
    }

    var flockController = new FlockController(triangles,canvas)
    this.flockController = flockController

    //this.addObject(flockController)


    var testpath = [-100,-100,100,-100,20,100]
    var position = new v2d(200,200)

    var t = new Triangle(position,testpath,this)
    var v = new TriangleVision(t)
    t.color = "rgba(0,255,0,0.5)"
    t.position.add(100,0)

    this.addObject(t)
    this.addObject(v)

    this.draw = function(graphics)
    {
        var ctx = canvas.getContext("2d")

        ctx.fillStyle = this.backgroundFillStyle
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

    /*for(var i = 0; i < 4000;i++)
    {
        this.update(0.0167)
    }*/

    this.onclick = function(event)
    {
        this.removeObject(this.flockController)
        console.log("CLICK IN THE LETTER SCENE!!!")
        this.emit(Triangle.returnHomeEventName)
    }
}

LetterScene.prototype = {}



copyPrototype(Scene,LetterScene)
copyPrototype(EventEmitter,LetterScene)