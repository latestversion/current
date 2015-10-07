function TranslationAction(model,distance,direction,time,accelerated)
{
    this.model = model
    this.acceleration = new v2d(0,0)
    this.velocity = new v2d(0,0)
    this.time = time
    this.timecount = 0

    if(accelerated)
    {
        var a = 2*distance/time/time
        this.acceleration = direction.clone()
        this.acceleration.normalize(a)
    }
    else
    {
        var v = distance/time
        this.velocity = direction.clone()
        this.velocity.normalize(v)
    }

}

TranslationAction.prototype = {}
TranslationAction.prototype.update = function(dt)
{
    if(this.timecount > this.time)
    {
        return false
    }

    this.timecount += dt

    var dv = this.acceleration.clone()
    dv.multiply(dt)
    this.velocity.vectoradd(dv)
    var dp = this.velocity.clone()
    dp.multiply(dt)
    this.model.position.vectoradd(dp)

    return true
}

function RotationAction(model,angle,time,accelerated)
{
    this.model = model
    this.a = 0
    this.v = 0
    this.time = time
    this.timecount = 0

    if(accelerated)
    {
        this.a = 2*angle/time/time
    }
    else
    {
        var v = a/time
    }
}

RotationAction.prototype = {}
RotationAction.prototype.update = function(dt)
{
    if(this.timecount > this.time)
    {
        return false
    }

    this.timecount += dt

    var dv = this.a*dt
    this.v += dv
    var da = this.v*dt
    this.model.rotate(da)

    return true
}