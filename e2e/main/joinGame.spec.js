describe('e2e testing: create Game', function(){

	var createPage;
	var joinPage;

	beforeEach(function(){
		browser.get('/');
		createPage = require('./createGame.po');
		joinPage = require('./joinGame.po');
	});


	it('should disable button, when no input', function(done){
		
		createPage.gameName.sendKeys("MyGame");
		createPage.userName.sendKeys("Kiddi");
		createPage.createGameButton.click();

		var playPage = require('./playGame.po');

		playPage.joinLink.getAttribute('href').then(function (joinHref) {
			browser.getAllWindowHandles().then(function (handles) {

				var creatorHandle = handles[0];
				var joinerHandle = 'join-window';

				browser.executeScript('window.open("' + joinHref + '", ' + '"' + joinerHandle + '"' + ')');

				console.log(creatorHandle);
				browser.switchTo().window(joinerHandle);
				joinPage.userName.sendKeys("");
				expect(joinPage.joinGameButton.getAttribute('ng-disabled')).toBeTruthy();
				done();
			});
		});
	});

	it('should disable button, when no name to long', function(done){
		
		createPage.gameName.sendKeys("MyGame");
		createPage.userName.sendKeys("Kiddi");
		createPage.createGameButton.click();

		var playPage = require('./playGame.po');

		playPage.joinLink.getAttribute('href').then(function (joinHref) {
			browser.getAllWindowHandles().then(function (handles) {

				var creatorHandle = handles[0];
				var joinerHandle = 'join-window';

				browser.executeScript('window.open("' + joinHref + '", ' + '"' + joinerHandle + '"' + ')');

				console.log(creatorHandle);
				browser.switchTo().window(joinerHandle);
				joinPage.userName.sendKeys("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
				expect(joinPage.joinGameButton.getAttribute('ng-disabled')).toBeTruthy();
				done();
			});
		});
	});

	it('should show error, when name same as other user', function(done){
		
		createPage.gameName.sendKeys("MyGame");
		createPage.userName.sendKeys("Kiddi");
		createPage.createGameButton.click();

		var playPage = require('./playGame.po');

		playPage.joinLink.getAttribute('href').then(function (joinHref) {
			browser.getAllWindowHandles().then(function (handles) {

				var creatorHandle = handles[0];
				var joinerHandle = 'join-window';

				browser.executeScript('window.open("' + joinHref + '", ' + '"' + joinerHandle + '"' + ')');

				console.log(creatorHandle);
				browser.switchTo().window(joinerHandle);
				expect(joinPage.sameName.getText()).toBe("");
				joinPage.userName.sendKeys("Kiddi");
				joinPage.joinGameButton.click();
				expect(joinPage.sameName.getText()).toBe("UserName taken!!");
				done();
			});
		});
	});
});
