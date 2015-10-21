function req(f)
{
  require('./' + f)
}


req('CopyPrototype')
req('Entity')
req('DataEntity')
req('BasicDataClasses')
req('ContainerClasses')
req('LogicEntity')
req('Matchers')
console.log("Sane syntax")
