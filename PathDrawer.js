var PathDrawer = {}

PathDrawer.drawPath = function(canvas,path,fillstyle)
{
    ctx = canvas.getContext("2d")

    //ctx.fillStyle = "rbg(255,255," + Math.floor(Math.random()*255) + ")"
    ctx.fillStyle = fillstyle
    ctx.beginPath()
    ctx.moveTo(path[0],path[1])
    for (j = 1; j < path.length/2; j++)
    {
        var x = path[2*j]
        var y = path[2*j+1]
        ctx.lineTo(x,y)
        //console.log("(" + x + "," + y + ")")
        //console.log("TIME " + j)
    }
    ctx.lineTo(path[0],path[1])
    ctx.closePath()
    ctx.fill()
}


