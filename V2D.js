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

_p.add = function(dx,dy)
{
    //console.log("Adding " + dx + " " + dy)
    this.x += dx
    this.y += dy
}

_p.vectoradd = function(v)
{
    this.add(v.x,v.y)
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

_p.normalize = function()
{
    this.multiply(1/this.length())
}

v2d.distance = function(x1,y1,x2,y2)
{
    return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2))
}

