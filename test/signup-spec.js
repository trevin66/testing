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