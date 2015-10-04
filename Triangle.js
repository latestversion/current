

function debugDraw(model,ctx)
{
    if (model.avgposition)
        {
            ctx.strokeStyle = "rgb(255,0,0)"
            ctx.beginPath()
            ctx.moveTo(model.position.x,model.position.y)
            ctx.lineTo(model.position.x+model.avgposition.x,model.position.y+model.avgposition.y)
            ctx.stroke()
        }

        if (model.avgvelocity)
        {
            ctx.strokeStyle = "rgb(0,255,0)"
            ctx.beginPath()
            ctx.moveTo(model.position.x,model.position.y)
            ctx.lineTo(model.position.x+model.avgvelocity.x,model.position.y+model.avgvelocity.y)
            ctx.stroke()
        }

        if (false && model.NEIGHBOR_RADIUS)
        {
            ctx.fillStyle = "rgba(255,0,255,0.1)"
            ctx.beginPath()
            ctx.arc(model.position.x,model.position.y,model.NEIGHBOR_RADIUS,0,2*Math.PI);
            ctx.fill()
        }

        if (model.separation)
        {
            ctx.strokeStyle = "rgb(0,0,255)"
            ctx.beginPath()
            ctx.moveTo(model.position.x,model.position.y)
            ctx.lineTo(model.position.x+model.separation.x,model.position.y+model.separation.y)
            ctx.stroke()
        }

        if (model.WANTED_SEPARATION)
        {
            ctx.fillStyle = "rgba(0,0,255,0.1)"
            ctx.beginPath()
            ctx.arc(model.position.x,model.position.y,model.WANTED_SEPARATION,0,2*Math.PI);
            ctx.fill()
        }
}

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


        ctx.save()
        ctx.fillStyle = "rgb(255,0,0)"
        ctx.beginPath()
        ctx.arc(model.position.x,model.position.y,5,0,2*Math.PI);
        ctx.fill()

        ctx.beginPath()
        ctx.arc(pos.x + model.path[2*model.sharpPointIdx],pos.y + model.path[2*model.sharpPointIdx+1],5,0,2*Math.PI);
        ctx.fill()


        ctx.restore()

        //debugDraw(model,ctx)
    }
}

function PositionUpdateController(model)
{
    this.model = model
    this.maxvelocity = 5
    this.update = function(dt)
    {
        //console.log("Acceleration: " + this.model.acceleration)

        this.model.velocity.x += this.model.acceleration.x*dt
        this.model.velocity.y += this.model.acceleration.y*dt

        if (this.model.velocity.length() > this.maxvelocity)
        {
            this.model.velocity.normalize()
            this.model.velocity.multiply(this.maxvelocity)
        }

        this.model.position.x += this.model.velocity.x*dt
        this.model.position.y += this.model.velocity.y*dt
    }
}


function Triangle(path)
{
    GameObject.call(this)

    this.path = path.splice(0)
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

    //console.log("Tri ctpr This position is " + this.position)
    // console.log("This ")

    this.sharpPointIdx = this.calcSharpestPointIdx()
    this.color = "rgb(0,255,0)"
    this.view = new TriangleView(this)
    this.controller = new PositionUpdateController(this)
    //console.log("Tri ctpr This position is " + this.position)
}


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
    this.controller.update(dt)
}