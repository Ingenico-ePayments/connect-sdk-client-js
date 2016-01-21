$.validator.setDefaults({
	errorClass: "error",
	errorElement: "label", // the error element type
	errorPlacement: function(error, element) {
		var parentLabel = element.parent('label')
			,formGroup = element.closest('.form-group');


		if (parentLabel.length === 1) {
			/*
			 radio and checkboxes might be placed inside a .form-group, like this:
				<div class="form-group">
					<div class="radio">
						<label>
							<input type="radio">
				or

				<div class="form-group">
					<label class="radio-inline">
						<input type="radio">
			*/


			formGroup = parentLabel.closest('.form-group');

			if (formGroup.length === 1) {
				//insert error after last radio/checkbox
				error.insertAfter(formGroup.find('label:last'));
			} else {
				//insert error after label
				error.insertAfter(parentLabel);
			}
		} else {
			formGroup.append(error);
			// error.insertAfter(element);
		}

	},
	highlight: function(element, errorClass) {
		$(element).closest(".form-group").addClass("has-" + errorClass);
	},
	unhighlight: function(element, errorClass) {
		$(element).closest(".form-group").removeClass("has-" + errorClass);
	}
});