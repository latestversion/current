

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

        /*
        ctx.save()
        ctx.fillStyle = "rgb(255,0,0)"
        ctx.beginPath()
        ctx.arc(model.position.x,model.position.y,5,0,2*Math.PI);
        ctx.fill()

        ctx.fillStyle = "rgb(255,0,0)"
        ctx.beginPath()
        ctx.arc(pos.x + model.path[2*model.sharpPointIdx],pos.y + model.path[2*model.sharpPointIdx+1],5,0,2*Math.PI);
        ctx.fill()
        */

        ctx.restore()

        //debugDraw(model,ctx)
    }
}


var TriangleBreakState = {
    BREAK_TIME: 3,
    lastEnterTime: 0,
    enter: function(model)
    {
        model.acceleration.x = -1*model.velocity.x/this.BREAK_TIME
        model.acceleration.y = -1*model.velocity.y/this.BREAK_TIME
        this.lastEnterTime = Dates.stime()
    },
    update: function(dt,model)
    {
        var now = Dates.stime()
        if(now-this.lastEnterTime >= this.BREAK_TIME)
        {
        }
        else
        {
            model.updatePositionAndRotation(dt)
        }

    }
}


function PositionUpdateController(model)
{
    this.model = model

    this.update = function(dt)
    {
        this.model.updatePositionAndRotation(dt)
    }
}

var TrianglePositionUpdateState = {
update: function(dt,model)
{
    model.updatePositionAndRotation(dt)
}}

function Triangle(path,scene)
{
    GameObject.call(this)

    this.path = path.splice(0)
    this.scene = scene

    this.maxvelocity = 10 + Math.floor(Math.random()*40)

    // Set position to midpoint and set path coordinates relative midpoint
    var numVertices = 3
    for (var i = 0; i < numVertices; i++)
    {
        this.position.add(this.path[2*i],this.path[2*i+1])
    }
    this.position.divide(3)

    for (var i = 0; i < numVertices; i++)
    {
        this.path[2*i] -= this.position.x
        this.path[2*i+1] -= this.position.y
    }

    // Save original position and path positions
    this.originalPosition = this.position.clone()
    this.originalPath = this.path.splice()

    // Figure out a sort of midpoint line
    this.sharpPointIdx = this.calcSharpestPointIdx()
    this.view = new TriangleView(this)
    this.controller = TrianglePositionUpdateState

    this.onReturnToHomeEvent = function()
    {
        this.controller = TriangleBreakState
        TriangleBreakState.enter(this)
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

    this.rot += a
}

copyPrototype(GameObject,Triangle)