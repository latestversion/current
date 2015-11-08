
function TemplateInstanceDatabase()
{
  this.instances = []
  this.templates = []
}

var _p = TemplateInstanceDatabase.prototype

_p.GetTemplate = function(entityid) {
  // body...
  templateid = 8 + entityid
  return templateid
}


_p.Generate = function(templateid)
{
  var entityid = 7
  return entityid
}

// etc
