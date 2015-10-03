var Utils = {}

Utils.textObjectToTriangles = function(t)
{
    var triangles = []
    for (var lnIdx = 0; lnIdx < t.lines.length; lnIdx++)
    {
        var line = t.lines[lnIdx]
        for (var symIdx = 0; symIdx < line.length; symIdx++)
        {
            var sym = line[symIdx]
            //console.log("Letter " + sym.letter)
            var paths = sym.paths

            for (var i = 0; i < paths.length; i++)
            {
                var path = paths[i]
                var triangleindices = earcut(path)
                for(var j = 0; j < triangleindices.length; j += 3)
                {
                    var trianglePath = new Path(path,triangleindices.slice(j,j+3))
                    var tri = new Triangle(trianglePath)
                    tri.color = ColorBank.getRandom("yellow") //"rgb(0,255,0)"
                    triangles.push(tri)
                }
            }
            //console.log("Triangles: " + triangles.length)
        }
    }
    return triangles
}