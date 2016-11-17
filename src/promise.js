define('connectsdk.promise', ['connectsdk.core'], function(turing) {
	function PromiseModule(global) {
		/**
		 * The Promise class.
		 */
		function Promise(singleton) {
			var self = this;
			this.pending = [];

			/**
			 * Resolves a promise.
			 *
			 * @param {Object} A value
			 */
			this.resolve = function(result) {
				self.complete('resolve', result);
			},

			/**
			 * Rejects a promise.
			 *
			 * @param {Object} A value
			 */
			this.reject = function(result) {
				self.complete('reject', result);
			};

			if (singleton) {
				this.isSingleton = true;
			}
		}


		Promise.prototype = {
			/**
			 * Adds a success and failure handler for completion of this Promise object.
			 *
			 * @param {Function} success The success handler
			 * @param {Function} success The failure handler
			 * @returns {Promise} `this`
			 */
			then : function(success, failure) {
				this.pending.push({
					resolve : success,
					reject : failure
				});
				return this;
			},

			/**
			 * Runs through each pending 'thenable' based on type (resolve, reject).
			 *
			 * @param {String} type The thenable type
			 * @param {Object} result A value
			 */
			complete : function(type, result) {
				while (this.pending[0]) {
					this.pending.shift()[type](result);
				}
			}
		};

		global.Promise = Promise;
	}
	PromiseModule(connectsdk);

	return connectsdk.Promise;
});