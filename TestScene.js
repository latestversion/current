
function TestScene(text,scenehandler,canvas)
{
    Scene.call(this,scenehandler,canvas)
    EventEmitter.call(this)

    this.backgroundFillStyle = "rgb(255,200,255)"


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
        var n = 50
        for(var j = 0; j < n;j++)
        {
            var os = this.getObjects()
            for (var i = 0; i < os.length; i++)
            {
                os[i].update(dt/n)
            }
        }
    }

    /*for(var i = 0; i < 4000;i++)
    {
        this.update(0.0167)
    }*/

    this.onclick = function(event)
    {
        console.log("CLICK IN THE SCENE!!!")
        this.emit(Triangle.returnHomeEventName)
    }
}

TestScene.prototype = {}


copyPrototype(Scene,TestScene)
copyPrototype(EventEmitter,TestScene)

