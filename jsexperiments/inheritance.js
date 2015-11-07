

var l = console.log

function Animal()
{
  this.animal = true
  this.ctor = this.constructor.name
  this.blargh = this.constructor.name
}

var _p = Animal.prototype = {}

function Cow()
{
  Animal.call(this)
  this.cow = true
}

Cow.prototype = {}

Cow.prototype.constructor = {name:"BaskervillesHound"}

function SuperCow()
{
  Cow.call(this)
  this.supercow = true
}


var c = new Cow()

var sc = new SuperCow()


l("The name of ghe ctor is " + c.ctor)
l("The name of ghe ctor is " + sc.blargh)
