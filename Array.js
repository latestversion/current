
Array.prototype.foreach = function(callback)
{
    for (var i = 0; i < this.length; i++)
    {
        callback(this[i])
    }
}

Array.prototype.getRandomIndex = function()
{
    var n = Math.floor(Math.random()*this.length)
    return n
}

Array.prototype.getRandomElement = function()
{
    var n = this.getRandomIndex()
    return this[n]
}


var Arrays = {
    remove: function(obj, arr) {
        var index = arr.indexOf(obj);
        if (index != -1)
            arr.splice(index, 1);
    },

    contains: function(obj, arr) {
        return arr.indexOf(obj) > -1;
    },

    addIfAbsent: function(obj, arr) {
        if (!Arrays.contains(obj, arr)) {
            arr.push(obj);
        }
    },

    getRandomElement: function(arr) {
    	var n = this.getRandomIndex(arr);
    	return arr[n];
    },

    getRandomIndex: function(arr) {
   	var n = Math.floor((Math.random()*arr.length));
    	return n;
	}

};