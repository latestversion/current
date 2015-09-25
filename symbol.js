function Symbol(letter,width,height,paths)
{
    this.letter = letter;
    this.width = width;
    this.height = height;
    // Clone paths
    this.paths = [];
    for(i = 0; i < paths.length; i++)
    {
        this.paths[i] = paths[i].slice(0)
    }
}

Symbol.prototype = {};

Symbol.prototype.scale = function(scale){
    for (i = 0; i < this.paths.length; i++)
    {
        var path = this.paths[i]
        for (j = 0; j < path.length; j++)
         {
            path[j] *= scale
         }
    }

    this.width *= scale
    this.height *= scale
}

Symbol.prototype.clone = function()
{
    return new Symbol(this.letter,this.width,this.height,this.paths)
}

Symbol.prototype.translate = function(dx,dy){
    for (i = 0; i < this.paths.length; i++)
    {
        var path = this.paths[i]
        for (j = 0; j < path.length; j += 2)
         {
            path[j] += dx
            path[j+1] += dy
         }
    }
}

Symbol.prototype.draw = function(canvas)
{
    ctx = canvas.getContext("2d");
    ctx.strokeColor = "rgb(155,255,255)"
    ctx.fillStyle = "rgba(231, 76, 60,1.0)"
    paths = this.paths;

    for(var i = 0;i < paths.length;i++)
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
