var gulp = require('gulp')
	,concat = require('gulp-concat')
	,uglify = require('gulp-uglify')
	,minifyCss = require('gulp-minify-css')
	,usemin = require('gulp-usemin')
	,clean = require('gulp-clean')
	,stripDebug = require('gulp-strip-debug')
	,sourcemaps = require('gulp-sourcemaps')

    ,fullSdkSrc = [
		"src/example-app/js-sdk/vendor/es5shim.js",
		"src/example-app/js-sdk/vendor/forge-0.6.34/js/util.js",
		"src/example-app/js-sdk/vendor/forge-0.6.34/js/cipher.js",
		"src/example-app/js-sdk/vendor/forge-0.6.34/js/cipherModes.js",
		"src/example-app/js-sdk/vendor/forge-0.6.34/js/aes.js",
		"src/example-app/js-sdk/vendor/forge-0.6.34/js/oids.js",
		"src/example-app/js-sdk/vendor/forge-0.6.34/js/asn1.js",
		"src/example-app/js-sdk/vendor/forge-0.6.34/js/sha1.js",
		"src/example-app/js-sdk/vendor/forge-0.6.34/js/sha256.js",
		"src/example-app/js-sdk/vendor/forge-0.6.34/js/sha512.js",
		"src/example-app/js-sdk/vendor/forge-0.6.34/js/md.js",
		"src/example-app/js-sdk/vendor/forge-0.6.34/js/hmac.js",
		//"src/example-app/js-sdk/vendor/forge-0.6.34/js/pem.js",
		"src/example-app/js-sdk/vendor/forge-0.6.34/js/prng.js",
		"src/example-app/js-sdk/vendor/forge-0.6.34/js/random.js",
		"src/example-app/js-sdk/vendor/forge-0.6.34/js/jsbn.js",
		"src/example-app/js-sdk/vendor/forge-0.6.34/js/pkcs1.js",
		"src/example-app/js-sdk/vendor/forge-0.6.34/js/rsa.js",
		//"src/example-app/js-sdk/vendor/forge-0.6.34/js/pbe.js",
		//"src/example-app/js-sdk/vendor/forge-0.6.34/js/tls.js",
		//"src/example-app/js-sdk/vendor/forge-0.6.34/js/debug.js",
		"src/example-app/js-sdk/vendor/forge-0.6.34/js/forge.js",
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
		"src/example-app/js-sdk/globalcollect/PaymentProducts.js",
		"src/example-app/js-sdk/globalcollect/PaymentRequest.js",
		"src/example-app/js-sdk/globalcollect/C2SPaymentProductContext.js",
		"src/example-app/js-sdk/globalcollect/JOSEEncryptor.js",
		"src/example-app/js-sdk/globalcollect/Encryptor.js",
		"src/example-app/js-sdk/globalcollect/session.js"
	]
	
    ,sdkSrcNoEncryption = [
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
		"src/example-app/js-sdk/globalcollect/PaymentProducts.js",
		"src/example-app/js-sdk/globalcollect/PaymentRequest.js",
		"src/example-app/js-sdk/globalcollect/C2SPaymentProductContext.js",
		"src/example-app/js-sdk/globalcollect/session.js"
	];


gulp.task('createFullSdk', function() {
  gulp.src(fullSdkSrc)
  		.pipe(sourcemaps.init())
        .pipe(concat('gcsdk.js'))
        .pipe(stripDebug())
        .pipe(gulp.dest('./dist/'))
        .pipe(concat('gcsdk.min.js'))
        .pipe(uglify())
		.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('createSdkNoEncryption', function() {
    gulp.src(sdkSrcNoEncryption)
		.pipe(sourcemaps.init())
        .pipe(concat('gcsdk.noEncrypt.js'))
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
      		js: [sourcemaps.init(), uglify(), sourcemaps.write('.')]
    	}))
        .pipe(gulp.dest('./dist/example-app/'));
    
});

// clean folder
gulp.task('clean', function () {
	return gulp.src('./dist/**/*', {read: false}).pipe(clean({force: true}));

});

gulp.task('default', ['createFullSdk', 'createSdkNoEncryption', 'createApplication']);
