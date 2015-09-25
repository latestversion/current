function test_draw(symbol,canvas)
{
    ctx = canvas.getContext("2d");
    ctx.strokeColor = "rgb(155,255,255)"
    ctx.fillStyle = "rgba(231, 76, 60,1.0)"
    paths = symbol.paths;

    for(i = 0;i< paths.length;i++)
    {
        ctx.beginPath()
        path = paths[i];
        ctx.moveTo(path[0],path[1]);
        for (j = 0; j < path.length; j++)
        {
            ctx.lineTo(path[2*j],path[2*j+1]);
        }
        ctx.lineTo(path[0],path[1]);
        ctx.closePath()
        ctx.fill()
    }


}

// David Morales on SO
function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}

