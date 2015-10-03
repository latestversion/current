// A path is a one dimensional array with x and y coordinates in a long sequence
// The length of the path array is 2* the number of vertices.

function Path(coords,indices)
{
    //console.log("coords: " + coords.length)
    //console.log("indices: " + indices.length)
    //console.log(indices)
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

Path.prototype = {}


