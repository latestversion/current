//SceneHandler
function RestlessDemo(text,canvas)
{
    SceneHandler.call(this)

    // start timeouts
    this.update = function()
    {
        this.getCurrentScene().update(0.0167)
    }

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
    }
}

RestlessDemo.prototype = {}
copyPrototype(SceneHandler,RestlessDemo)