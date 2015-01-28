var combo = (function () {
    return {
	around: around,
	before: before,
	after: after
    };

    function convertToArray(args) {
	return Array.prototype.slice.call(args);
    }

    function around(self, methodName, aroundMethod) {
	var method = self[methodName];
	var args = [method].concat(convertToArray(arguments));
	self[methodName] = function () {
	  return aroundMethod.apply(self, args);
	};
    }

    function before(self, methodName, beforeMethod) {
	around(self, methodName, function (innerMethod) {
	    var args = convertToArray(arguments).slice(1);
	    beforeMethod.apply(self, args);
	    return innerMethod.apply(self, args);
	});
    }

    function after(self, methodName, afterMethod) {
	around(self, methodName, function (innerMethod) {
	    var args = convertToArray(arguments).slice(1);
	    var result = innerMethod.apply(self, args);
	    afterMethod.apply(self, args);
	    return result;
	});
    }

})();

