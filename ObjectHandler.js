
function ObjectHandler()
{
    console.log("ctor testscene")
	this.objects = []
}

ObjectHandler.prototype = {}

_p = ObjectHandler.prototype

_p.addObject = function(o)
{
	this.objects.push(o);
}

_p.removeObject = function(o)
{
    for(var i = 0;i < this.objects.length;i++)
    {
        if(this.objects[i] == o)
        {
            this.objects.splice(i,1);
            return;
        }
    }
}

_p.getObjects = function()
{
    return this.objects;
}

_p.getObjectByTag = function(tag)
{
    console.log("meh");
    for(var i = 0;i < this.objects.length;i++)
    {
        console.log("tag: " + this.objects.getTag());
        if(this.objects[i].getTag() == tag)
        {
            return this.objects[i];
        }
    }
    throw "NO tag " + tag;
}

_p.name = "ObjectHandlerPrototype"