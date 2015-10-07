
function TriangleView(model)
{
    this.model = model
    this.draw = function(canvas)
    {
        var model = this.model
        var pos = this.model.position

        ctx = canvas.getContext("2d")
        ctx.fillStyle = model.color
        ctx.beginPath()
        var numVertices = 3
        ctx.moveTo(model.position.x + model.path[0],model.position.y+model.path[1])
        for (var i = 1; i < numVertices; i++)
        {
            ctx.lineTo(model.position.x + model.path[2*i],model.position.y+model.path[2*i+1])
        }
        ctx.closePath()
        ctx.fill()

        ctx.restore()
    }
}

function Triangle(position,path,scene)
{
    GameObject.call(this)

    this.path = path.splice(0)
    this.scene = scene

    this.maxvelocity = 30 + Math.floor(Math.random()*40)

    // Save original position and path positions
    this.position = position
    this.originalPosition = this.position.clone()
    this.originalPath = this.path.splice()

    // Figure out a sort of midpoint line
    this.sharpPointIdx = this.calcSharpestPointIdx()

    this.originalDirection = this.getCurrentDirection()

    this.view = new TriangleView(this)
    this.controller = TrianglePositionUpdateState


    this.onReturnToHomeEvent = function()
    {
        this.controller = new TriangleAimForOriginalPositionState(this)
        this.controller.enter(this)
    }

    this.onReturnToHomeEvent = this.onReturnToHomeEvent.bind(this)

    this.scene.on(Triangle.returnHomeEventName,this.onReturnToHomeEvent)
}

Triangle.returnHomeEventName = "trianglesBackToHome"
Triangle.AIM_TIME = 1
Triangle.BACK_TO_POS_TIME = 3
Triangle.ALIGN_TIME = 3

var _p = Triangle.prototype

_p.calcSharpestPointIdx = function()
{
    var idx = 2
    var minDistance = v2d.distance(this.path[4],this.path[5],this.path[0],this.path[1])

    for(var i = 0; i < 2;i++)
    {
        var d = v2d.distance(this.path[2*i],this.path[2*i+1],this.path[2*(i+1)],this.path[2*(i+1)+1])
        if (d < minDistance)
        {
            minDistance = d
            idx = i
        }
    }

    idx = idx-1

    if(idx < 0)
    {
        idx = 2
    }

    return idx
}

_p.draw = function(canvas)
{
    this.view.draw(canvas)
}

_p.update = function(dt)
{
    this.controller.update(dt,this)
}

_p.stopMoving = function()
{
    this.acceleration.set(0,0)
    this.velocity.set(0,0)

}

_p.rotate = function(a)
{
    for (var i = 0; i < 3;i++)
    {
        var oldx = this.path[2*i]
        var oldy = this.path[2*i+1]
        var newx = oldx*Math.cos(a) - oldy*Math.sin(a)
        var newy = oldx*Math.sin(a) + oldy*Math.cos(a)
        this.path[2*i] = newx
        this.path[2*i+1] = newy
        //console.log("so eh... updated path....")
    }
}

_p.getSharpestPointPosition = function()
{
    return new v2d(this.position.x + this.path[2*this.sharpPointIdx],this.position.y+this.path[2*this.sharpPointIdx+1])
}

_p.getCurrentDirection = function()
{
    return this.position.vectorTo(this.getSharpestPointPosition())
}

_p.getOriginalDirection = function()
{
    return this.originalDirection
}

_p.getMidpointToOriginalPositionVector = function()
{
    return this.position.vectorTo(this.originalPosition)
}

copyPrototype(GameObject,Triangle)
