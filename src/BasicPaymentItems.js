define("connectsdk.BasicPaymentItems", ["connectsdk.core"], function(connectsdk) {
	"use strict";

		var _parseJson = function (_products, _groups, _basicPaymentItems) {
		var doRemove = [];
		if (_groups) {
			for (var i = 0, il = _groups.basicPaymentProductGroups.length; i < il; i++) {
				var groupId = _groups.basicPaymentProductGroups[i].id,
						groupReplaced = false;
				for (var j = 0, jl = _products.basicPaymentProducts.length; j < jl; j++) {
					var productMethod = _products.basicPaymentProducts[j].paymentProductGroup;
					if (productMethod === groupId && groupReplaced === false) {
						// replace instance by group
						_products.basicPaymentProducts.splice(j, 1, _groups.basicPaymentProductGroups[i]);
						groupReplaced = true;
					} else if (productMethod === groupId && groupReplaced === true) {
						// mark for removal
						doRemove.push(j);
					}
				}
			}
			for (var i = doRemove.length -1, il = 0; i >= il; i--) {
				_products.basicPaymentProducts.splice(doRemove[i], 1);
			}
		}
		_basicPaymentItems.basicPaymentItems = JSON.parse(JSON.stringify(_products.basicPaymentProducts));
		for (var i = 0, il = _basicPaymentItems.basicPaymentItems.length; i < il; i++) {
			var basicPaymentItem = _basicPaymentItems.basicPaymentItems[i];
			_basicPaymentItems.basicPaymentItemById[basicPaymentItem.id] = basicPaymentItem;
			if (basicPaymentItem.accountsOnFile) {
				var aofs = basicPaymentItem.accountsOnFile;
				for (var j = 0, jl = aofs.length; j < jl; j++) {
					var aof = aofs[j];
					_basicPaymentItems.accountsOnFile.push(aof);
					_basicPaymentItems.accountOnFileById[aof.id] = aof;
				}
			}
		};
	};

	var BasicPaymentItems = function (products, groups) {
		this.basicPaymentItems = [];
		this.basicPaymentItemById = {};
		this.accountsOnFile = [];
		this.accountOnFileById = {};
		_parseJson(products, groups, this);
	};
	connectsdk.BasicPaymentItems = BasicPaymentItems;
	return BasicPaymentItems;
});