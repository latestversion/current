function v2d(x,y)
{
    this.x = x
    this.y = y
}

v2d.prototype = {}

var _p = v2d.prototype

_p.clone = function()
{
    return new v2d(this.x,this.y)
}

_p.toString = function()
{
    return "v2d(" + this.x + "," + this.y + ")"
}

_p.set = function(x,y)
{
    this.x = x
    this.y = y
}

_p.vectorset = function(v)
{
    this.x = v.x
    this.y = v.y
}

_p.add_ip = function(dx,dy)
{
    this.x += dx
    this.y += dy
}

_p.addv = function(v)
{
    return new v2d(this.x+v.x,this.y+vy)
}

_p.addv_ip = function(v)
{
    this.x += v.x
    this.y += v.y
}

_p.vectoradd = function(v)
{
    this.add_ip(v.x,v.y)
}

_p.distance = function(v)
{
    return Math.sqrt(Math.pow((v.x-this.x),2) + Math.pow(v.y-this.y,2))
}

_p.sqdistance = function(v)
{
    var dx = v.x-this.x
    var dy = v.y-this.y
    return Math.pow(dx,2) + Math.pow(dy,2)
}

_p.eucliddistance = function(v)
{
    var dx = v.x-this.x
    var dy = v.y-this.y
    return dx+dy
}

_p.vectorFrom = function(v)
{
    return new v2d(this.x-v.x,this.y-v.y)
}

_p.vectorTo = function(v)
{
    return new v2d(v.x-this.x,v.y-this.y)
}

_p.multiply = function(num)
{
    //console.log(num)
    this.x *= num
    this.y *= num
    //console.log("x: " + this.x)
}

_p.divide = function(num)
{
    this.x = this.x / num
    this.y = this.y / num
}

_p.length = function()
{
    return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2))
}

_p.setlength = function(newlength)
{
    this.normalize()
    this.multiply(newlength)
}

_p.normalize = function()
{
    var newlength = 1
    if(0 != arguments.length)
    {
        newlength = arguments[0]
    }
    this.multiply(newlength/this.length())
}

v2d.distance = function(x1,y1,x2,y2)
{
    return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2))
}

_p.dotproduct = function(v)
{
    return this.x*v.x+this.y*v.y
}

v2d.crossproductzcomponent = function(a,b)
{
    return a.x*b.y-a.y*b.x
}

v2d.signedanglebetweenvectors = function(a,b)
{
    var dp = a.dotproduct(b)
    var cosangle = dp/(a.length() * b.length())
    var angle = Math.acos(cosangle)

    var zcomponent = v2d.crossproductzcomponent(a,b)
    var direction = Math.sign(zcomponent)

    return angle*direction
}

v2d.signedangleforpositions = function(common,alignFrom,alignTo)
{
    var moving = common.vectorTo(alignFrom)
    var align = common.vectorTo(alignTo)
    return v2d.signedanglebetweenvectors(moving,align)
}
