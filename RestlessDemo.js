function RestlessDemo(text,canvas)
{
    SceneHandler.call(this)
    this.canvas = canvas
    this.lastUpdate = 0
    this.simulationTimeFactor = 4

    this.update = function()
	{
	    var t = Dates.time()
	    var dt = t-this.lastUpdate
	    dt = dt/1000
	    if(dt > 1/60)
	    {
	        dt = 1/60
	    }
	    for(var simStep = 0;simStep < this.simulationTimeFactor;simStep++)
		{
		    this.getCurrentScene().update(dt/this.simulationTimeFactor);
		}

		this.lastUpdate = t
		this.getCurrentScene().draw(this.canvas);
		requestAnimationFrame(this.update);
	}

	this.update = this.update.bind(this);

    this.onclick = function(event)
    {
        console.log("CLICK " + event.x + "," + event.y)
        if(this.getCurrentScene().onclick)
        {
            this.getCurrentScene().onclick(event)
        }
    }

    this.onclick = this.onclick.bind(this)

    document.addEventListener("click",this.onclick,false)

    this.start = function()
    {
        var s = new LetterScene(text,this,canvas)
        this.pushScene(s)
        this.lastUpdate = Dates.time()
        this.animationFrameRequestId = requestAnimationFrame(this.update);
    }
}



RestlessDemo.prototype = {}
copyPrototype(SceneHandler,RestlessDemo)