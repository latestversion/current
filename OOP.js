function copyPrototype(fromclass,toclass)
{
    fromp = fromclass.prototype
    top = toclass.prototype

    for (var key in fromp)
    {
        if (top.hasOwnProperty(key))
        {
            throw  "Property overwritten: " + key
        }
        else
        {
            top[key] = fromp[key]
        }
    }
}