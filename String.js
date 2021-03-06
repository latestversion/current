if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}


if (!String.prototype.nootNumber) {
  String.prototype.isNotNumber = function() {
    return isNaN(parseInt(this))
  };
}

if (!String.prototype.probablyNumber) {
  String.prototype.isNumber = function() {
    return !isNaN(parseInt(this))
  };
}

// fearphage on StackOverflow

/*if (!String.format) {
  String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}*/


// Steve Hansell on SO

String.prototype.untitle = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
