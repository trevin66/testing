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
describe('Valid email required', function() {
	var text = element(by.binding('email.text'));
	var input = element(by.model('email.text'));
	var invalid = element(by.binding('myForm.email.$valid'));
	browser.get('http://localhost:8080/#/');

	it('should initialize to model', function() {
		expect(text.getText()).toContain('meme@spicy.com');
		expect(valid.getText()).toContain('true');
	});
	
	it('should state that an email is required if empty', function() {
		email.clear();
		email.sendKeys('');
		expect(text.getText()).toEqual('text =');
		expect(valid.getText()).toContain('false');
	});
	
	it('should show error if field is invalid', function() {
		input.clear();
		input.sendKeys('Tyler1 looks like a Geodude');
		input.sendKeys('xxxx');
		expect(valid.getText()).toContain('false');
	});
});

// Birthdate testing
describe('Valid birthdate required', function() {
	browser.get('http://localhost:8080/#/');

	it('should not show error if the date entered is valid', function() {
		var birthdate = element(by.css("#birthdate"));
		birthdate.sendKeys("06/06/1944");
		var invalid = element(by.css("#validDate"));
		expect(invalid.isDisplayed()).toBe(false);
	});
	it('should show error if the date entered is after the current date', function() {
		var birthdate = element(by.css( 	"#birthdate"));
		birthdate.sendKeys('12/32/1999');
		var invalid = element(by.css("#validDate"));
		expect(invalid.isDisplayed()).toBe(true);
	});
	it('should show error if the date entered is less than 13 years ago', function() {
		var birthdate = element(by.css("#birthdate"));
		birthdate.sendKeys('10/10/2010');
		var invalid = element(by.css("#validDate"));
		expect(invalid.isDisplayed()).toBe(true);
	});
	it('should show error if the date entered is older than the oldest person alive', function() {
		var birthdate = element(by.css("#birthdate"));
		birthdate.sendKeys('07/04/1776');
		var invalid = element(by.css("#validDate"));
		expect(invalid.isDisplayed()).toBe(true);
	});
	it('should show error if birthday field is left empty', function() {
		var birthdate = element(by.css("#birthdate")); 
		birthdate.clear();
		var required = element(by.css("#needBirthdate"));
		expect(required.isDisplayed()).toBe(true);
	});
});

// Submit form testing
describe('Valid form filled out', function() {
	browser.get('http://localhost:8080/#/');
	var submit = element(by.css('#submit'));
	var errors = element(by.css('.help-block')).isDisplayed();

	it('should not allow the form to complete if there are invalid fields', function() {
		if(errors == true) {
			expect(submit.isEnabled()).toEqual(false);
		}
	})

	it('should not allow the form to complete if there are blank fields', function() {
		var email = element(by.css('#email'));
		var lName = element(by.css('#last_name'));
		var bDay = element(by.css('#birthdate'));
		var password = element(by.css('#password'));
		var confirm = element(by.css('#confirm_password'));

		// fields completed
		email.sendKeys('pepe@meme.com');
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