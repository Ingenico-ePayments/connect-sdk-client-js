var gulp = require('gulp')
	, concat = require('gulp-concat')
	, uglify = require('gulp-uglify')
	, usemin = require('gulp-usemin')
	, rimraf = require('gulp-rimraf')
	, stripDebug = require('gulp-strip-debug')
	, sourcemaps = require('gulp-sourcemaps')
	, replace = require('gulp-replace')
  , plumber = require('gulp-plumber')
	, fs = require("fs")

	, fullSdkSrc = [
		"src/example-app/js-sdk/vendor/es5shim.js",
		"src/example-app/js-sdk/vendor/forge-0.6.39/js/util.js",
		"src/example-app/js-sdk/vendor/forge-0.6.39/js/cipher.js",
		"src/example-app/js-sdk/vendor/forge-0.6.39/js/cipherModes.js",
		"src/example-app/js-sdk/vendor/forge-0.6.39/js/aes.js",
		"src/example-app/js-sdk/vendor/forge-0.6.39/js/oids.js",
		"src/example-app/js-sdk/vendor/forge-0.6.39/js/asn1.js",
		"src/example-app/js-sdk/vendor/forge-0.6.39/js/sha1.js",
		"src/example-app/js-sdk/vendor/forge-0.6.39/js/sha256.js",
		"src/example-app/js-sdk/vendor/forge-0.6.39/js/sha512.js",
		"src/example-app/js-sdk/vendor/forge-0.6.39/js/md.js",
		"src/example-app/js-sdk/vendor/forge-0.6.39/js/hmac.js",
		//"src/example-app/js-sdk/vendor/forge-0.6.39/js/pem.js",
		"src/example-app/js-sdk/vendor/forge-0.6.39/js/prng.js",
		"src/example-app/js-sdk/vendor/forge-0.6.39/js/random.js",
		"src/example-app/js-sdk/vendor/forge-0.6.39/js/jsbn.js",
		"src/example-app/js-sdk/vendor/forge-0.6.39/js/pkcs1.js",
		"src/example-app/js-sdk/vendor/forge-0.6.39/js/rsa.js",
		//"src/example-app/js-sdk/vendor/forge-0.6.39/js/pbe.js",
		//"src/example-app/js-sdk/vendor/forge-0.6.39/js/tls.js",
		//"src/example-app/js-sdk/vendor/forge-0.6.39/js/debug.js",
		"src/example-app/js-sdk/vendor/forge-0.6.39/js/forge.js",
		"src/example-app/js-sdk/globalcollect/core.js",
		"src/example-app/js-sdk/globalcollect/promise.js",
		"src/example-app/js-sdk/globalcollect/net.js",
		"src/example-app/js-sdk/globalcollect/util.js",
		"src/example-app/js-sdk/globalcollect/PublicKeyResponse.js",
		"src/example-app/js-sdk/globalcollect/C2SCommunicatorConfiguration.js",
		"src/example-app/js-sdk/globalcollect/IinDetailsResponse.js",
		"src/example-app/js-sdk/globalcollect/C2SCommunicator.js",
		"src/example-app/js-sdk/globalcollect/LabelTemplateElement.js",
		"src/example-app/js-sdk/globalcollect/Attribute.js",
		"src/example-app/js-sdk/globalcollect/AccountOnFileDisplayHints.js",
		"src/example-app/js-sdk/globalcollect/AccountOnFile.js",
		"src/example-app/js-sdk/globalcollect/PaymentProductDisplayHints.js",
		"src/example-app/js-sdk/globalcollect/BasicPaymentProduct.js",
		"src/example-app/js-sdk/globalcollect/BasicPaymentProductGroup.js",
		"src/example-app/js-sdk/globalcollect/MaskedString.js",
		"src/example-app/js-sdk/globalcollect/MaskingUtil.js",
		"src/example-app/js-sdk/globalcollect/ValidationRuleLuhn.js",
		"src/example-app/js-sdk/globalcollect/ValidationRuleExpirationDate.js",
		"src/example-app/js-sdk/globalcollect/ValidationRuleFixedList.js",
		"src/example-app/js-sdk/globalcollect/ValidationRuleLength.js",
		"src/example-app/js-sdk/globalcollect/ValidationRuleRange.js",
		"src/example-app/js-sdk/globalcollect/ValidationRuleRegularExpression.js",
		"src/example-app/js-sdk/globalcollect/ValidationRuleEmailAddress.js",
		"src/example-app/js-sdk/globalcollect/ValidationRuleFactory.js",
		"src/example-app/js-sdk/globalcollect/DataRestrictions.js",
		"src/example-app/js-sdk/globalcollect/ValueMappingElement.js",
		"src/example-app/js-sdk/globalcollect/FormElement.js",
		"src/example-app/js-sdk/globalcollect/Tooltip.js",
		"src/example-app/js-sdk/globalcollect/PaymentProductFieldDisplayHints.js",
		"src/example-app/js-sdk/globalcollect/PaymentProductField.js",
		"src/example-app/js-sdk/globalcollect/PaymentProduct.js",
		"src/example-app/js-sdk/globalcollect/PaymentProductGroup.js",
		"src/example-app/js-sdk/globalcollect/BasicPaymentProducts.js",
		"src/example-app/js-sdk/globalcollect/BasicPaymentProductGroups.js",
		"src/example-app/js-sdk/globalcollect/BasicPaymentItems.js",
		"src/example-app/js-sdk/globalcollect/PaymentRequest.js",
		"src/example-app/js-sdk/globalcollect/C2SPaymentProductContext.js",
		"src/example-app/js-sdk/globalcollect/JOSEEncryptor.js",
		"src/example-app/js-sdk/globalcollect/Encryptor.js",
		"src/example-app/js-sdk/globalcollect/session.js"
	]

	, sdkSrcNoEncryption = [
		"src/example-app/js-sdk/vendor/es5shim.js",
		"src/example-app/js-sdk/globalcollect/core.js",
		"src/example-app/js-sdk/globalcollect/promise.js",
		"src/example-app/js-sdk/globalcollect/net.js",
		"src/example-app/js-sdk/globalcollect/util.js",
		"src/example-app/js-sdk/globalcollect/PublicKeyResponse.js",
		"src/example-app/js-sdk/globalcollect/C2SCommunicatorConfiguration.js",
		"src/example-app/js-sdk/globalcollect/IinDetailsResponse.js",
		"src/example-app/js-sdk/globalcollect/C2SCommunicator.js",
		"src/example-app/js-sdk/globalcollect/LabelTemplateElement.js",
		"src/example-app/js-sdk/globalcollect/Attribute.js",
		"src/example-app/js-sdk/globalcollect/AccountOnFileDisplayHints.js",
		"src/example-app/js-sdk/globalcollect/AccountOnFile.js",
		"src/example-app/js-sdk/globalcollect/PaymentProductDisplayHints.js",
		"src/example-app/js-sdk/globalcollect/BasicPaymentProduct.js",
		"src/example-app/js-sdk/globalcollect/BasicPaymentProductGroup.js",
		"src/example-app/js-sdk/globalcollect/MaskedString.js",
		"src/example-app/js-sdk/globalcollect/MaskingUtil.js",
		"src/example-app/js-sdk/globalcollect/ValidationRuleLuhn.js",
		"src/example-app/js-sdk/globalcollect/ValidationRuleExpirationDate.js",
		"src/example-app/js-sdk/globalcollect/ValidationRuleFixedList.js",
		"src/example-app/js-sdk/globalcollect/ValidationRuleLength.js",
		"src/example-app/js-sdk/globalcollect/ValidationRuleRange.js",
		"src/example-app/js-sdk/globalcollect/ValidationRuleRegularExpression.js",
		"src/example-app/js-sdk/globalcollect/ValidationRuleEmailAddress.js",
		"src/example-app/js-sdk/globalcollect/ValidationRuleFactory.js",
		"src/example-app/js-sdk/globalcollect/DataRestrictions.js",
		"src/example-app/js-sdk/globalcollect/ValueMappingElement.js",
		"src/example-app/js-sdk/globalcollect/FormElement.js",
		"src/example-app/js-sdk/globalcollect/Tooltip.js",
		"src/example-app/js-sdk/globalcollect/PaymentProductFieldDisplayHints.js",
		"src/example-app/js-sdk/globalcollect/PaymentProductField.js",
		"src/example-app/js-sdk/globalcollect/PaymentProduct.js",
		"src/example-app/js-sdk/globalcollect/PaymentProductGroup.js",
		"src/example-app/js-sdk/globalcollect/BasicPaymentProducts.js",
		"src/example-app/js-sdk/globalcollect/BasicPaymentProductGroups.js",
		"src/example-app/js-sdk/globalcollect/BasicPaymentItems.js",
		"src/example-app/js-sdk/globalcollect/PaymentRequest.js",
		"src/example-app/js-sdk/globalcollect/C2SPaymentProductContext.js",
		"src/example-app/js-sdk/globalcollect/session.js"
	];

var VERSION = fs.readFileSync("VERSION.TXT", "utf8");

gulp.task('createFullSdk', function () {
  gulp.src(fullSdkSrc)
  		.pipe(sourcemaps.init())
		.pipe(concat('gcsdk.js'))
				.pipe(replace(/\$\{version\}/g, VERSION))
		.pipe(stripDebug())
		.pipe(gulp.dest('./dist/'))
		.pipe(concat('gcsdk.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('createSdkNoEncryption', function () {
	gulp.src(sdkSrcNoEncryption)
		.pipe(sourcemaps.init())
		.pipe(concat('gcsdk.noEncrypt.js'))
				.pipe(replace(/\$\{version\}/g, VERSION))
		.pipe(stripDebug())
		.pipe(gulp.dest('./dist/'))
		.pipe(concat('gcsdk.noEncrypt.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./dist/'));
});

gulp.task('createApplication', function () {

	// exaple app. The SDK is compilen from the references in the html file.
	gulp.src('./src/example-app/global/**/*').pipe(gulp.dest('./dist/example-app/global/'));
	gulp.src('./src/example-app/*.html')
		.pipe(usemin({
			css: ['concat'],
			js: [replace(/\$\{version\}/g, VERSION), sourcemaps.init(), uglify(), sourcemaps.write('.')]
		}))
		.pipe(gulp.dest('./dist/example-app/'));

});

// clean folder
gulp.task('clean', function (cb) {
	return gulp.src('./dist', { read: false }).pipe(plumber()).pipe(rimraf());
});

gulp.task('default', ['createFullSdk', 'createSdkNoEncryption', 'createApplication']);
