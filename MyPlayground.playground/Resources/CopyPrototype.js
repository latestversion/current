function CopyPrototype(fromclass,toclass)
{
    var fromp = fromclass.prototype
    var top = toclass.prototype

    //console.log("Copying from " + fromp.name + " to " + top.name)

    for (var key in fromp)
    {
        if (top.hasOwnProperty(key))
        {
            //console.log("Property overwritten: " + key)
        }
        else
        {
            //console.log("copying prop " + key)

        }
        top[key] = fromp[key]
    }

}

function CopyProperties(fromobj,toobj)
{
    var from = fromobj
    var to = toobj

    for (var key in from)
    {
        to[key] = from[key]
    }
}
