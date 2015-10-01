function RestlessDemo(text,canvas)
{
    SceneHandler.call(this)
    this.canvas = canvas


    this.update = function()
	{
		this.getCurrentScene().update(0.0167);
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
        var s = new TestScene(this,canvas)
        this.pushScene(s)
        this.animationFrameRequestId = requestAnimationFrame(this.update);
    }
}



RestlessDemo.prototype = {}
copyPrototype(SceneHandler,RestlessDemo)