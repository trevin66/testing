//test suite for last name
describe('Last name field', function() {
	//open the page
	beforeEach(function() {
		browser.get('http://localhost:8080/#/');
	});

	it('should display a warning if no name is entered', function() {
		var lastInput = element(by.model('last_name'));
		lastInput.sendKeys(' ');
		lastInput.clear();
		//clear method seems to leave the last input focused, so i send keys to another unrelated field to defocus this one
		var confirmInput = element(by.model('confirm_password'));
		confirmInput.sendKeys(' ');

		var lastRequiredWarn = element(by.css('#last-required'));
		expect(lastRequiredWarn.isDisplayed()).toBe(true);
	});

	it('should not display a warning if a name is entered', function() {
		var lastInput = element(by.model('last_name'));
		lastInput.sendKeys('Smith');

		var lastRequiredWarn = element(by.css('#last-required'));
		expect(lastRequiredWarn.isDisplayed()).toBe(false);
	});
});

//test suite for passwords
describe('Password validation', function() {
	//open the page
	beforeEach(function() {
		browser.get('http://localhost:8080/#/');
	});

	it('should display a warning if passwords do not match', function() {
		var passwordInput = element(by.model('password'));
		passwordInput.sendKeys('supersecret');
		var confirmInput = element(by.model('confirm_password'));
		confirmInput.sendKeys('notthesame');

		var matchWarn = element(by.css('#password-match'));
		expect(matchWarn.isDisplayed()).toBe(true);
	});

	it('should not display a warning if passwords match', function() {
		var passwordInput = element(by.model('password'));
		passwordInput.sendKeys('supersecret');
		var confirmInput = element(by.model('confirm_password'));
		confirmInput.sendKeys('supersecret');

		var matchWarn = element(by.css('#password-match'));
		expect(matchWarn.isDisplayed()).toBe(false);
	});

	it('should display a warning if either password is not entered', function() {
		var passwordInput = element(by.model('password'));
		passwordInput.sendKeys(' ');
		passwordInput.clear();
		var confirmInput = element(by.model('confirm_password'));
		confirmInput.sendKeys(' ');
		confirmInput.clear();
		//clear method seems to leave the last input focused, so i send keys to another unrelated field to defocus this one
		var emailInput = element(by.model('email'));
		emailInput.sendKeys(' ')

		var confirmRequiredWarn = element(by.css('#confirm-required'));
		var passwordRequiredWarn = element(by.css('#password-required'));
		expect(confirmRequiredWarn.isDisplayed()).toBe(true);
		expect(passwordRequiredWarn.isDisplayed()).toBe(true);
	});
});

// Email testing
describe('Email required', function() {
	browser.get('http://localhost:8080/#/');
	var input_email = element(by.css('#email'));
	var required = element(by.css('#needEmail'));
	it('should not show error if email field is filled', function() {
		input_email.sendKeys('pepe@meme.com');
		expect(required.isDisplayed()).toEqual(false);
	})
	it('should show error if email field is left empty', function() {
		input_email.clear();
		input_email.sendKeys('Canada');
		input_email.sendKeys('Tyler1 looks like a Geodude');
		expect(required.isDisplayed()).toEqual(true);
	})
});

describe('Valid email', function() {
	browser.get('http://localhost:8080/#/');
	var input_email = element(by.css('#email'));
	var valid = element(by.css('#validEmail'));
	it('should not show error if valid email is filled', function() {
		input_email.sendKeys('pepe@meme.com');
		expect(required.isDisplayed()).toEqual(false);
	})

	it('should show error if email field is invalid', function() {
		input_email.clear();
		input_email.sendKeys('Canada');
		input_email.sendKeys('Tyler1 looks like a Geodude');
		expect(required.isDisplayed()).toEqual(true);
	})
});

// Submit form testing
describe('Valid form filled out', function() {
	browser.get('http://localhost:8080/#/');
	var submit = element(by.css('#submit'));
	var errors = element(by.css('.help-block')).isDisplayed();

	it('should not allow the form to complete if there are invalid fields', function() {
		if(errors == true) {
			expect(submit.isEnalbed()).toEqual(false);
		}
	})

	it('should not allow the form to complete if there are blank fields', function() {
		var email = element(by.css('#email'));
		var fName = element(by.css('#first_name'));
		var lName = element(by.css('#last_name'));
		var bDay = element(by.css('#birthdate'));
		var password = element(by.css('#password'));
		var confirm = element(by.css('#confirm_password'));

		// fields completed
		email.sendKeys('pepe@meme.com');
		fName.sendKeys('Kevin');
		lName.sendKeys('Smith');
		bDay.sendKeys('02/14/1996');
		password.sendKeys('supersecret');
		confirm.sendKeys('supersecret');

		// blank fields
		email.clear();
		fName.clear();
		lName.clear();
		bDay.clear();
		password.clear();
		confirm.clear();
		expect(submit.isEnabled()).toEqual(false);
	})
	
	it('should allow the form to complete if there are no invalid fields', function() {
		if(errors == false) {
			expect(submit.isEnabled()).toEqual(true);
		}
	})
});