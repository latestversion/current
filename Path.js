// A path is a one dimensional array with x and y coordinates in a long sequence
// The length of the path array is 2* the number of vertices.

function Path(coords,indices)
{
    var path = []
    var coord = 0
    var i = 0
    for (var ind = 0; ind < indices.length; ind++)
    {
        path[i] = coords[2*indices[ind]]
        i += 1
        path[i] = coords[1+2*indices[ind]]
        i += 1
    }
    return path
}

Path.avgPoint = function(path)
{
    var p = new v2d(0,0)

    for (var i = 0; i < path.length/2; i++)
    {
        p.add(path[2*i],path[2*i+1])
    }
    p.divide(path.length/2)
    return p
}


Path.setRelativeToPoint = function(path,point)
{
    for (var i = 0; i < path.length/2; i++)
    {
       path[2*i] -= point.x
       path[2*i+1] -= point.y
    }
}

Path.prototype = {}


