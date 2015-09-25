


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
        ctx.fillStyle = "rgb(255,255,0)";
        ctx.fillRect(0,0,200,200);
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
    var heightPart = 0.80

    var unscaledTextHeight = alphabet.rowheight*numlines + (numlines-1)*linedistance*alphabet.rowheight

    // Say we want 80% of available height
    var wantedHeight = canvas.height * heightPart

    this.scale = wantedHeight / unscaledTextHeight

    this.scaledHeight = wantedHeight

    this.lines = []

    var i,j

    var maxlinewidth = 0

    for (i = 0; i < lines.length; i++)
    {
        this.lines[i] = []
        this.lines[i].width = letterdistance*(this.lines[i].length-1)
        line = lines[i]

        for (j = 0; j < line.length;j++)
        {
            var char = line.charAt(j)
            var sym = alphabet[char].clone()
            sym.scale(this.scale)
            this.lines[i][j] = sym
            this.lines[i].width += sym.width
        }
    }

    for (i = 0; i < this.lines.length; i++)
    {
        line = this.lines[i]
        line.x = (canvas.width-line.width)/2
        line.y = (canvas.height-this.scaledHeight)/2+i*this.scale*alphabet.rowheight*(1+linedistance)
    }

    for (i = 0; i < this.lines.length; i++)
    {
        line = this.lines[i]
        var accumX = line.x
        for (j = 0; j < line.length;j++)
        {
            sym = line[j]
            console.log("translating")
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

