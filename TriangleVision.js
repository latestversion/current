function TriangleVision(triangle)
{
    this.triangle = triangle
    this.orgtriangle = {position:triangle.originalPosition,path:triangle.originalPath.splice(),color:"black"}
    this.view = new TriangleView(this.orgtriangle)
}

var _p = TriangleVision.prototype

_p.update = function(dt){}

_p.draw = function(canvas)
{
    var ctx = canvas.getContext("2d")
    var pos = this.triangle.position
    var model = this.triangle

    console.log("Drawing")
    this.view.draw(canvas)

    // LINE TO ORIGIN
    ctx.beginPath()
    ctx.strokeStyle = "rgb(255,0,0)"
    ctx.moveTo(pos.x,pos.y)
    ctx.lineTo(model.originalPosition.x,model.originalPosition.y)
    ctx.stroke()

    // LINE MIDPOINT - SHARP POINT
    ctx.beginPath()
    ctx.strokeStyle = "rgb(0,0,255)"
    ctx.moveTo(pos.x,pos.y)
    ctx.lineTo(pos.x + model.path[2*model.sharpPointIdx],pos.y + model.path[2*model.sharpPointIdx+1])
    ctx.stroke()


    // DRAW ANGLE BETWEEN DIR AND VECTOR TO ORGPOS
    var sharpvec = new v2d(pos.x + model.path[2*model.sharpPointIdx],pos.y + model.path[2*model.sharpPointIdx+1])
    var degree = v2d.signedangleforpositions(model.position,sharpvec,model.originalPosition)
    degreetheta = Math.round(180*degree/Math.PI)

    ctx.fillStyle = "black"
    ctx.font = '24pt Calibri'
    ctx.fillText(" " +degreetheta, model.position.x, model.position.y)

    // DRAW ANGLE BETWEEN DIR AND ORGDIR
    var angle = v2d.signedanglebetweenvectors(model.getCurrentDirection(),model.getOriginalDirection())
    var degreeangle = Math.round(180*angle/Math.PI)

    ctx.fillStyle = "green"
    ctx.font = '24pt Calibri'
    ctx.fillText(" " + degreeangle, model.position.x, model.position.y+10)

    // DRAW MIDPOINT
    ctx.save()
    ctx.fillStyle = "rgb(255,0,0)"
    ctx.beginPath()
    ctx.arc(model.position.x,model.position.y,5,0,2*Math.PI);
    ctx.fill()

    // DRAW MIDPOINT OF ORG
    ctx.save()
    ctx.fillStyle = "rgb(255,0,0)"
    ctx.beginPath()
    ctx.arc(this.orgtriangle.position.x,this.orgtriangle.position.y,5,0,2*Math.PI);
    ctx.fill()

    ctx.fillStyle = "rgb(255,0,0)"
    ctx.beginPath()
    ctx.arc(pos.x + model.path[2*model.sharpPointIdx],pos.y + model.path[2*model.sharpPointIdx+1],5,0,2*Math.PI);
    ctx.fill()

}


