


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
    }
}


function Text(text,alphabet,canvas,wantedHeight)
{
    TextModel.call(this,text,alphabet);

    var lines = text.split("\n")
    var numlines = lines.length
    var linedistance = 0.1 // part of alphabet line height

    var unscaledTextHeight = alphabet.rowheight*numlines + (numlines-1)*linedistance*alphabet.rowheight

    // Say we want 80% of available height
    var wantedHeight = canvas.height * 0.80

    var scale = wantedHeight / unscaledTextHeight


    var symbols = [];
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var textHeight = 0;

    var maxHeightSymbol = 0;

    for(i = 0; i < lines.length; i++)
    {
        line = lines[i];
        line.width = this.letterspacing*(line.length-1);
        line.height = 0;

        for(j = 0; j < line.length; j++)
        {
            c = line.charAt(j);
            var symbol = alphabet[c];

            line.width += symbol.width;

           if (symbol.height > line.height)
           {
               line.height = symbol.height;
           }
        }

        textHeight += line.height+line.height*this.rowspacing;
    }

    this.view = new TextView(this);

    this.draw = function(canvas)
    {
        this.view.draw(canvas);
    }
}

