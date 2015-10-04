function RestlessDemo(text,canvas)
{
    SceneHandler.call(this)
    this.canvas = canvas
    this.lastUpdate = 0

    this.update = function()
	{
	    var t = Dates.time()
	    var dt = t-this.lastUpdate
	    if(dt > 1/60)
	    {
	        dt = 1/60
	    }
	    console.log(dt/1000)
		this.getCurrentScene().update(0.16);
		this.lastUpdate = t
		this.getCurrentScene().draw(this.canvas);
		requestAnimationFrame(this.update);
	}

	this.update = this.update.bind(this);

    this.onclick = function(event)
    {
        console.log("CLICK " + event.x + "," + event.y)
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