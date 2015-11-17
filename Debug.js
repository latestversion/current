
var Debug = {}


Debug.GetAllProperties = function(obj){
    var allProps = []
      , curr = obj
    do{
        var props = Object.getOwnPropertyNames(curr)
        props.forEach(function(prop){
            if (allProps.indexOf(prop) === -1)
                allProps.push(prop)
        })
    }while(curr = Object.getPrototypeOf(curr))
    return allProps
}