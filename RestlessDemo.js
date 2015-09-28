//SceneHandler
function RestlessDemo(text,canvas)
{
    // start timeouts
    this.update = function()
    {

    }

    this.onclick = function(event)
    {
        console.log("CLICK " + event.x + "," + event.y)
    }

    this.onclick = this.onclick.bind(this)

    document.addEventListener("click",this.onclick,false)

    this.start = function()
    {

    }
}

RestlessDemo.prototype = {}
SceneHandler.call(RestlessDemo.prototype)