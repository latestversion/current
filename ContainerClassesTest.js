
function Garage()
{
  HasContainer.call(this,"cars")
}

function House(argroom)
{
  HasContainer.call(this,"rooms")
  this.AddRoom(argroom)
}

House.prototype = HasContainer.getPrototypeInstance("rooms")

Garage.prototype = HasContainer.getPrototypeInstance("cars")

var c = new Garage()
c.AddCar("BMW")
c.AddCar("MIFF MOFF")
var h = new House("bedroom")

console.log(h)
console.log(c)


c.DelCar("MIFF MOFF")
console.log(c)
