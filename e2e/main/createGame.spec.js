'use strict'

console.debug = console.log;

describe('e2e testing: create Game', function(){

	var createPage;
	var joinPage;

	beforeEach(function(){
		browser.get('/');
		createPage = require('./createGame.po');
		joinPage = require('./joinGame.po');
	});


	it('should disable button, when no input', function(done){
		
		createPage.gameName.sendKeys("");
		createPage.userName.sendKeys("");
		expect(createPage.createGameButton.getAttribute('ng-disabled')).toBeTruthy();
		done();
	});

	it('should disable button, when gamename too long', function(done){
		
		createPage.gameName.sendKeys("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
		createPage.userName.sendKeys("Kiddi");
		expect(createPage.createGameButton.getAttribute('ng-disabled')).toBeTruthy();
		done();
	});

	it('should disable button, when username too long', function(done){
		
		createPage.gameName.sendKeys("Game");
		createPage.userName.sendKeys("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
		expect(createPage.createGameButton.getAttribute('ng-disabled')).toBeTruthy();
		done();
	});
});
