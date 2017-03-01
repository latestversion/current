//kerimdzhanov of stackoverflow

var RNG = {}

// function(min,max)
RNG.RandomInt = function(a,b)
{
  var min, max
  if('undefined' == typeof(b))
  {
    min = 0
    max = a
  }
  else
  {
    min = a
    max = b
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
}

RNG.D100 = function(percentchance)
{
  var die = RNG.RandomInt(99)+1
  return (die<=percentchance)
}
