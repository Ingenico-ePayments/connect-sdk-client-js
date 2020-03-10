var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    uglify     = require('gulp-uglify-es').default,
    rimraf     = require('gulp-rimraf'),
    sourcemaps = require('gulp-sourcemaps'),
    replace    = require('gulp-replace'),
    plumber    = require('gulp-plumber'),
    fs         = require('fs');

var fullSdkSrc = [
  'node_modules/node-forge/dist/forge.min.js',
  'src/core.js',
  'src/promise.js',
  'src/net.js',
  'src/Util.js',
  'src/GooglePay.js',
  'src/PublicKeyResponse.js',
  'src/C2SCommunicatorConfiguration.js',
  'src/IinDetailsResponse.js',
  'src/C2SCommunicator.js',
  'src/LabelTemplateElement.js',
  'src/Attribute.js',
  'src/AccountOnFileDisplayHints.js',
  'src/AccountOnFile.js',
  'src/PaymentProduct302SpecificData.js',
  'src/PaymentProduct320SpecificData.js',
  'src/PaymentProduct863SpecificData.js',
  'src/PaymentProductDisplayHints.js',
  'src/BasicPaymentProduct.js',
  'src/BasicPaymentProductGroup.js',
  'src/MaskedString.js',
  'src/MaskingUtil.js',
  'src/ValidationRuleLuhn.js',
  'src/ValidationRuleExpirationDate.js',
  'src/ValidationRuleFixedList.js',
  'src/ValidationRuleLength.js',
  'src/ValidationRuleRange.js',
  'src/ValidationRuleRegularExpression.js',
  'src/ValidationRuleResidentIdNumber.js',
  'src/ValidationRuleEmailAddress.js',
  'src/ValidationRuleTermsAndConditions.js',
  'src/ValidationRuleBoletoBancarioRequiredness.js',
  'src/ValidationRuleIban.js',
  'src/ValidationRuleFactory.js',
  'src/DataRestrictions.js',
  'src/ValueMappingElement.js',
  'src/FormElement.js',
  'src/Tooltip.js',
  'src/PaymentProductFieldDisplayHints.js',
  'src/PaymentProductField.js',
  'src/PaymentProduct.js',
  'src/PaymentProductGroup.js',
  'src/BasicPaymentProducts.js',
  'src/BasicPaymentProductGroups.js',
  'src/BasicPaymentItems.js',
  'src/PaymentRequest.js',
  'src/C2SPaymentProductContext.js',
  'src/JOSEEncryptor.js',
  'src/Encryptor.js',
  'src/session.js'
];

var sdkSrcNoEncryption = [
  'src/core.js',
  'src/promise.js',
  'src/net.js',
  'src/Util.js',
  'src/GooglePay.js',
  'src/PublicKeyResponse.js',
  'src/C2SCommunicatorConfiguration.js',
  'src/IinDetailsResponse.js',
  'src/C2SCommunicator.js',
  'src/LabelTemplateElement.js',
  'src/Attribute.js',
  'src/AccountOnFileDisplayHints.js',
  'src/AccountOnFile.js',
  'src/PaymentProduct302SpecificData.js',
  'src/PaymentProduct320SpecificData.js',
  'src/PaymentProduct863SpecificData.js',
  'src/PaymentProductDisplayHints.js',
  'src/BasicPaymentProduct.js',
  'src/BasicPaymentProductGroup.js',
  'src/MaskedString.js',
  'src/MaskingUtil.js',
  'src/ValidationRuleLuhn.js',
  'src/ValidationRuleExpirationDate.js',
  'src/ValidationRuleFixedList.js',
  'src/ValidationRuleLength.js',
  'src/ValidationRuleRange.js',
  'src/ValidationRuleRegularExpression.js',
  'src/ValidationRuleResidentIdNumber.js',
  'src/ValidationRuleEmailAddress.js',
  'src/ValidationRuleTermsAndConditions.js',
  'src/ValidationRuleBoletoBancarioRequiredness.js',
  'src/ValidationRuleIban.js',
  'src/ValidationRuleFactory.js',
  'src/DataRestrictions.js',
  'src/ValueMappingElement.js',
  'src/FormElement.js',
  'src/Tooltip.js',
  'src/PaymentProductFieldDisplayHints.js',
  'src/PaymentProductField.js',
  'src/PaymentProduct.js',
  'src/PaymentProductGroup.js',
  'src/BasicPaymentProducts.js',
  'src/BasicPaymentProductGroups.js',
  'src/BasicPaymentItems.js',
  'src/PaymentRequest.js',
  'src/C2SPaymentProductContext.js',
  'src/JOSEEncryptor.js',
  'src/Encryptor.js',
  'src/session.js'
];

var VERSION = fs.readFileSync('VERSION.TXT', 'utf8');

gulp.task('createFullSdk', function (done) {
  gulp.src(fullSdkSrc)
    .pipe(sourcemaps.init())
    .pipe(concat('connectsdk.js'))
    .pipe(replace(/\$\{version\}/g, VERSION))
    .pipe(gulp.dest('./dist/'))
    .pipe(concat('connectsdk.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'));
  done();
});

gulp.task('createSdkNoEncryption', function (done) {
  gulp.src(sdkSrcNoEncryption)
    .pipe(sourcemaps.init())
    .pipe(concat('connectsdk.noEncrypt.js'))
    .pipe(replace(/\$\{version\}/g, VERSION))
    .pipe(gulp.dest('./dist/'))
    .pipe(concat('connectsdk.noEncrypt.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'));
  done();
});

// clean folder
gulp.task('clean', function (cb) {
  return gulp.src('./dist', { read: false }).pipe(plumber()).pipe(rimraf());
});

gulp.task('build', gulp.parallel('createFullSdk', 'createSdkNoEncryption'));

gulp.task('watch', function () {
  gulp.watch(['src/*.js'], gulp.series('build'))
});

gulp.task('default', function () {
  console.error('no default task! use gulp --tasks');
});
