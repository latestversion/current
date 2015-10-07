


function TextModel(text,alphabet)
{
    this.text = text;
    this.alphabet = alphabet;
    this.letterspacing = 10;
    this.rowspacing = 0.1;
    this.width = 0;
    this.height = 0;
    this.paths = []
}

function TextView(model)
{
    this.model = model;
    this.draw = function(canvas)
    {
        ctx = canvas.getContext("2d");
        ctx.save();
        ctx.fillStyle = "rgb(255,255,0)"
        ctx.restore();


        for(var i = 0; i < model.lines.length; i++)
        {
            line = this.model.lines[i]
            for(var j = 0; j < line.length; j++)
            {
                sym = line[j]
                sym.draw(canvas)
            }
        }

    }
}


function Text(text,alphabet,canvas,wantedHeight)
{
    TextModel.call(this,text,alphabet);

    var lines = text.split("\n")
    var numlines = lines.length
    var linedistance = 0.1
    var letterdistance = 10
    var heightPart = 0.80 // omg the naming here really sucks
    var widthPart = 0.90


    var unscaledMaxLineWidth = 0;

    for (var i = 0; i < lines.length; i++)
    {
        var line = lines[i]
        for (var c = 0; c < line.length; c++)
        {

        }
    }

    var unscaledTextHeight = alphabet.rowheight*numlines + (numlines-1)*linedistance*alphabet.rowheight

    var wantedHeight = canvas.height * heightPart

    this.scale = wantedHeight / unscaledTextHeight

    this.scaledHeight = wantedHeight

    this.lines = []

    // Calculate width based on vertical scale
    var i,j
    var maxlinewidth = 0
    var widestLineIdx = 1

    for (i = 0; i < lines.length; i++)
    {
        this.lines[i] = []
        // Include only dynamic part of width (ie not letterspacing)
        this.lines[i].width = 0 //letterdistance*(this.lines[i].length-1)
        line = lines[i]

        for (j = 0; j < line.length;j++)
        {
            var char = line.charAt(j)
            var sym = alphabet[char].clone()
            sym.scale(this.scale)
            this.lines[i][j] = sym
            this.lines[i].width += sym.width
        }
        if (maxlinewidth < this.lines[i].width)
        {
            maxlinewidth = this.lines[i].width
            widestLineIdx = i
        }

    }


    // See if we have to adjust scale based on the widest line and the width of the text area
    // Since we have a constant letterdistance we have to remove that from the scalable area
    var availablewidth = widthPart*canvas.width-letterdistance*(lines[widestLineIdx].length-1)
    var xscale = availablewidth/this.lines[widestLineIdx].width

    var rescale = 1
    if ((xscale < 1) && rescale)
    {
        for (i = 0; i < this.lines.length; i++)
        {
            this.lines[i].width *= xscale

            for (j = 0; j < lines[i].length;j++)
            {
                this.lines[i][j].scale(xscale)
            }
        }

        this.scaledHeight *= xscale
        this.scale *= xscale
    }

    for (i = 0; i < this.lines.length; i++)
    {
        line = this.lines[i]
        line.x = (canvas.width-line.width-(line.length-1)*letterdistance)/2
        line.y = (canvas.height-this.scaledHeight)/2+i*this.scale*alphabet.rowheight*(1+linedistance)
    }

    for (i = 0; i < this.lines.length; i++)
    {
        line = this.lines[i]
        var accumX = line.x
        for (j = 0; j < line.length;j++)
        {
            sym = line[j]
            sym.translate(accumX,line.y)
            accumX += sym.width+letterdistance
        }
    }

    this.view = new TextView(this);

    this.draw = function(canvas)
    {
        this.view.draw(canvas);
    }
}

Text.prototype = {}

Text.prototype.copyPaths = function()
{
    var allPaths = []
    var pathIdx = 0
    for (var l = 0; l < this.lines.length; l++)
    {
        line = this.lines[l]
         for(var i = 0; i < line.length;i++)
         {
            sym = line[i]
            for (var j = 0; j < sym.paths.length; j++)
            {
                allPaths[pathIdx++] = sym.paths[j].splice()
            }
         }
    }

    return allPaths
}