define('connectsdk.ValidationRuleIban', ['connectsdk.core'], function (connectsdk) {

  /**
   * Sanitize value by remove all unwanted chars of a Iban format
   *
   * @param {String} value
   * @returns {string}
   * @private
   */
  var _sanitizeValue = function (value) {
    return value.replace(/[^\d\w]+/g, '').toUpperCase();
  };

  /**
   * Get state if given value is a valid Iban format
   *
   * @param {String} value
   * @returns {boolean}
   * @private
   */
  var _isValidFormat = function (value) {
    return typeof value === 'string' && /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/.test(_sanitizeValue(value));
  };

  /**
   * Convert a value to a string needed for validation calculations
   *
   * @param {String} value
   * @returns {string}
   * @private
   */
  var _toComputedString = function (value) {
    return _sanitizeValue(value)

    // place the first 4 chars to the end
      .replace(/(^.{4})(.*)/, '$2$1')

      // replace letters by corresponding numbers A=10 / Z=35
      .replace(/[A-Z]/g, function (d) {
        return d.charCodeAt(0) - 55;
      });
  }

  /**
   * Validate Iban by given json
   *
   * @param {Object} json
   * @constructor
   */
  var ValidationRuleIban = function (json) {
    this.json           = json;
    this.type           = json.type;
    this.errorMessageId = json.type;

    /**
     * Validate Iban nrule
     *
     * @see https://github.com/arhs/iban.js/blob/master/iban.js
     *
     * @param   {string} value
     * @returns {boolean}
     */
    this.validate = function (value) {

      // bail if format is invalid
      if (!_isValidFormat(value)) {
        return false;
      }

      // Check if reminder module 97 equals 1
      // only then it should pass the validation
      var remainder = _toComputedString(value),
          block;

      while (remainder.length > 2) {
        block     = remainder.slice(0, 9);
        remainder = parseInt(block, 10) % 97 + remainder.slice(block.length);
      }

      return (parseInt(remainder, 10) % 97) === 1;
    };
  };

  connectsdk.ValidationRuleIban = ValidationRuleIban;
  return ValidationRuleIban;
});