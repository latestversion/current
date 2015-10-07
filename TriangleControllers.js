
function DoNothingController()
{
    this.update = function(dt,model)
    {
    }
}

function TriangleAimForOriginalPositionState(model)
{
    this.AIM_TIME = Triangle.AIM_TIME
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