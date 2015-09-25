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
