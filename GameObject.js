function GameObject()
{
    this.tag = ""
    this.acceleration = new v2d(0,0)
    this.velocity = new v2d(0,0)
    this.position = new v2d(0,0)

    this.rot = 0
    this.rot_v = 0
    this.rot_a = 0
}

GameObject.prototype = {}

var _p = GameObject.prototype

 _p.updatePosition = function(dt)
 {
    this.velocity.x += this.acceleration.x*dt
    this.velocity.y += this.acceleration.y*dt

    if (this.maxvelocity && this.velocity.length() > this.maxvelocity)
    {
        this.velocity.normalize()
        this.velocity.multiply(this.maxvelocity)
    }

    this.position.x += this.velocity.x*dt
    this.position.y += this.velocity.y*dt

 }