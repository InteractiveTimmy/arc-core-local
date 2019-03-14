(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.ARCCORE = factory());
}(this, function () { 'use strict';

	var ArcCore = /** @class */ (function () {
	    function ArcCore(name) {
	        this.name = name;
	    }
	    return ArcCore;
	}());

	return ArcCore;

}));
