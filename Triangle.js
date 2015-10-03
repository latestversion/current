

function TriangleView(triangle)
{
    this.model = triangle
    this.draw = function(canvas)
    {
        console.log()
        PathDrawer.drawPath(canvas,this.model.path,this.model.color)
    }
}


function Triangle(path)
{
    this.path = path.splice(0)
    this.sharpPointIdx = 0
    this.color = "rgb(0,255,0)"
    this.view = new TriangleView(this)
}


var _p = Triangle.prototype

_p.draw = function(canvas)
{
    this.view.draw(canvas)
}

_p.update = function(dt)
{

}