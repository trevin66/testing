//test suite for first name
describe('First name field', function() {
	it('', function() {

	});
});

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
	browser.get('http://localhost:8080');
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
	browser.get('http://localhost:8080');
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
