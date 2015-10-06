

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

function DoNothingController()
{
    this.update = function(dt,model)
    {
    }
}

function TriangleAimForOriginalPositionState(model)
{
    this.AIM_TIME = 5
    this.timeCount = 0
}

TriangleAimForOriginalPositionState.prototype = {}

var _p = TriangleAimForOriginalPositionState.prototype

_p.enter = function(model)
{
    model.acceleration.x = -1*model.velocity.x/this.AIM_TIME
    model.acceleration.y = -1*model.velocity.y/this.AIM_TIME

    var sharpestPoint = model.getSharpestPointPosition()//new v2d(model.position.x + model.path[2*model.sharpPointIdx],model.position.y+model.path[2*model.sharpPointIdx+1])
    var currentDirection = model.getCurrentDirection()
    var wantedDirection = model.position.vectorTo(model.originalPosition)

    var angle = v2d.signedanglebetweenvectors(currentDirection,wantedDirection)

    model.rot = angle
    model.rot_v = 0
    model.rot_a = 2*angle/(this.AIM_TIME*this.AIM_TIME)
}

_p.update = function(dt,model)
{

    if(this.timeCount >= this.AIM_TIME)
    {
        console.log("WOW, that rotation was havy work!")
        model.controller = new DoNothingController()
    }
    else
    {
        model.updatePosition(dt)
        var dv = model.rot_a*dt
        model.rot_v += dv
        var da = model.rot_v*dt

        model.rot -= da
        console.log("model.rot: " + model.rot)
        if(model.rot <= 0)
        {
            model.rot_a = 0
            model.rot_v = 0
        }
        else
        {
        model.rotate(da)
        }


        console.log("dt: "+dt)
        console.log("da: " + 180*da/Math.PI)

    }
    this.timeCount += dt
}

function PositionUpdateController(model)
{
    this.model = model

    this.update = function(dt)
    {
        this.model.updatePosition(dt)
    }
}

var TrianglePositionUpdateState = {
update: function(dt,model)
{
    model.updatePosition(dt)
}}

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

_p.getMidpointToOriginalPositionVector = function()
{
    return this.position.vectorTo(this.originalPosition)
}

copyPrototype(GameObject,Triangle)