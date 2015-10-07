
function DoNothingController()
{
    this.update = function(dt,model)
    {
    }
}

function AlignWithOriginController(model,time)
{
    this.model = model
    this.tcount = 0
    this.time = time

    var orgDir = model.getOriginalDirection()
    var dir = model.getCurrentDirection()

    var angle = v2d.signedanglebetweenvectors(dir,orgDir)

    model.rot_v = 0
    model.rot_a = 2*angle/time/time

}
AlignWithOriginController.protoype = {}

var _p = AlignWithOriginController.prototype

_p.update = function(dt,model)
{

    if(this.tcount >= this.time)
    {
        console.log("Rotation performed")
        model.controller = new DoNothingController()
    }
    else
    {
        var dv = model.rot_a*dt
        model.rot_v += dv
        var da = model.rot_v*dt
        model.rot -= da
        model.rotate(da)

    }
    this.tcount += dt
}


function GoToPositionController(model,toposition,time)
{
    this.model = model
    this.tcount = 0
    this.time = time
    model.maxvelocity = 10000
    var d = model.position.distance(toposition)
    var speed = d/time
    var newv = model.position.vectorTo(toposition)
    newv.normalize(speed)
    model.stopMoving()
    model.velocity = newv
}

GoToPositionController.prototype = {}
var _p = GoToPositionController.prototype
_p.update = function(dt,model)
{
    model.updatePosition(dt)
    this.tcount += dt
    if(this.tcount >= this.time)
    {
        model.stopMoving()
        model.controller = new AlignWithOriginController(model,Triangle.ALIGN_TIME)
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
    //model.acceleration.x = -1*model.velocity.x/this.AIM_TIME
    //model.acceleration.y = -1*model.velocity.y/this.AIM_TIME

    model.stopMoving()

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
        console.log("WOW, that rotation was heavy work!")
        model.controller = new GoToPositionController(model,model.originalPosition,Triangle.BACK_TO_POS_TIME)
    }
    else
    {
        //model.updatePosition(dt)
        var dv = model.rot_a*dt
        model.rot_v += dv
        var da = model.rot_v*dt
        model.rot -= da
        model.rotate(da)

//        console.log("da: " + 180*da/Math.PI)

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