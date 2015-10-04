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