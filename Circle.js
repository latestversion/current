
function CircleView(circle)
{
    this.model = circle
    this.draw = function(canvas)
    {
        var ctx = canvas.getContext("2d")
        var centerX = this.model.position.x / 2
        var centerY = this.model.position.y / 2
        var radius = 70

        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false)
        ctx.fillStyle = 'green'
        ctx.fill()
        ctx.lineWidth = 5
        ctx.strokeStyle = '#003300'
        ctx.stroke()
    }
}

function Circle(x,y)
{
    GameObject.call(this)
    this.view = new CircleView(this)
    this.tag = "flocker"
    this.position.x = x
    this.position.y = y
}

Circle.prototype = {}

var _p = Circle.prototype

_p.update = function(dt)
{
    console.log("circle update")
    this.position.x += 1
}

_p.draw = function(graphics)
{
    this.view.draw(graphics)
}

copyPrototype(GameObject,Circle)