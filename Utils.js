
var Utils = {}

Utils.textObjectToTrianglePaths = function(t)
{
    var trianglePaths = []
    for (var lnIdx = 0; lnIdx < t.lines.length; lnIdx++)
    {
        var line = t.lines[lnIdx]
        for (var symIdx = 0; symIdx < line.length; symIdx++)
        {
            var sym = line[symIdx]
            var paths = sym.paths

            for (var i = 0; i < paths.length; i++)
            {
                var path = paths[i]
                var triangleindices = earcut(path)
                for(var j = 0; j < triangleindices.length; j += 3)
                {
                    var trianglePath = new Path(path,triangleindices.slice(j,j+3))
                    trianglePaths.push(trianglePath)
                }
            }
        }
    }
    return trianglePaths
}


function debugDraw(model,ctx)
{
    if (model.avgposition)
        {
            ctx.strokeStyle = "rgb(255,0,0)"
            ctx.beginPath()
            ctx.moveTo(model.position.x,model.position.y)
            ctx.lineTo(model.position.x+model.avgposition.x,model.position.y+model.avgposition.y)
            ctx.stroke()
        }

        if (model.avgvelocity)
        {
            ctx.strokeStyle = "rgb(0,255,0)"
            ctx.beginPath()
            ctx.moveTo(model.position.x,model.position.y)
            ctx.lineTo(model.position.x+model.avgvelocity.x,model.position.y+model.avgvelocity.y)
            ctx.stroke()
        }

        if (false && model.NEIGHBOR_RADIUS)
        {
            ctx.fillStyle = "rgba(255,0,255,0.1)"
            ctx.beginPath()
            ctx.arc(model.position.x,model.position.y,model.NEIGHBOR_RADIUS,0,2*Math.PI);
            ctx.fill()
        }

        if (model.separation)
        {
            ctx.strokeStyle = "rgb(0,0,255)"
            ctx.beginPath()
            ctx.moveTo(model.position.x,model.position.y)
            ctx.lineTo(model.position.x+model.separation.x,model.position.y+model.separation.y)
            ctx.stroke()
        }

        if (model.WANTED_SEPARATION)
        {
            ctx.fillStyle = "rgba(0,0,255,0.1)"
            ctx.beginPath()
            ctx.arc(model.position.x,model.position.y,model.WANTED_SEPARATION,0,2*Math.PI);
            ctx.fill()
        }
}


var Dates = {
   time: function()
	{
		var d = new Date();
		return d.getTime();
	},
	stime: function()
	{
        return Dates.time()/1000
	}

}

var Random = {

    randomFloat: function(maxValue)
    {
        return (Math.random()*maxValue)
    },

    randomInt: function(maxValue)
    {
        return Math.floor(Random.randomFloat(maxValue))
    }
}



// David Morales on SO
function GetURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
}
