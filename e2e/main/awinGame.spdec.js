'use strict'

console.debug = console.log;

describe('e2e testing: winGame', function(){

	var createPage;
	var joinPage;

	beforeEach(function(){
		browser.get('/');
		createPage = require('./createGame.po');
		joinPage = require('./joinGame.po');
	});

	function makeMove(cell, expected){
		browser.sleep(1000);
		cell.click();
		expect(cell.getText()).toBe(expected);
		//console.log(cell.getText());
		/*
		console.log("making move");
		
		cell.getText().then(function(text){
			console.log("Cell: ", cell);
			console.log("Expected: ", expected);
			console.log("Text: ", text);
			expect(text).toBe(expected);
		})
		console.log("move made");
		*/
	}

	it('should win a  game', function(done){
		
		//console.log(JSON.stringify(createPage.gameName));
		createPage.gameName.sendKeys("MyGame2");
		createPage.userName.sendKeys("Kiddi2");
		createPage.createGameButton.click();

		var playPage = require('./playGame.po');


		//cant make move when game not full
		makeMove(playPage.x1y1, '');

		playPage.joinLink.getAttribute('href').then(function (joinHref) {
			browser.getAllWindowHandles().then(function (handles) {

				var creatorHandle = handles[0];
				var joinerHandle = 'join-window2';
				console.log("-------------", joinHref);
				browser.executeScript('window.open("' + joinHref + '", ' + '"' + joinerHandle + '"' + ')');

				console.log(creatorHandle);
				browser.switchTo().window(joinerHandle);
				joinPage.userName.sendKeys("Ragnar2");
				joinPage.joinGameButton.click();
				makeMove(playPage.x1y1, '');

				browser.switchTo().window(creatorHandle).then(function () {
					browser.driver.wait(function () {
					return browser.driver.isElementPresent(by.css('#myBoard')).then(function (el) {
					return el === true;
					});
					}).then(function () {

						expect(playPage.myname.getText()).toBe("X: Kiddi2");
						makeMove(playPage.x0y0, 'X');

						
						browser.switchTo().window(joinerHandle).then(function () {
							browser.driver.wait(function () {
							return browser.driver.isElementPresent(by.css('#myBoard')).then(function (el) {
							return el === true;
							});
							}).then(function () {

								expect(playPage.myname.getText()).toBe("O: Ragnar2");
								expect(playPage.opponentname.getText()).toBe("X: Kiddi2");
								makeMove(playPage.x1y0, 'O');

								browser.switchTo().window(creatorHandle).then(function () {
									browser.driver.wait(function () {
									return browser.driver.isElementPresent(by.css('#myBoard')).then(function (el) {
									return el === true;
									});
									}).then(function () {

										expect(playPage.myname.getText()).toBe("X: Kiddi2");
										expect(playPage.opponentname.getText()).toBe("O: Ragnar2");
										makeMove(playPage.x0y1, 'X');

										browser.switchTo().window(joinerHandle).then(function () {
											browser.driver.wait(function () {
											return browser.driver.isElementPresent(by.css('#myBoard')).then(function (el) {
											return el === true;
											});
											}).then(function () {

												expect(playPage.myname.getText()).toBe("O: Ragnar2");
												expect(playPage.opponentname.getText()).toBe("X: Kiddi2");
												makeMove(playPage.x1y1, 'O');

												browser.switchTo().window(creatorHandle).then(function () {
													browser.driver.wait(function () {
													return browser.driver.isElementPresent(by.css('#myBoard')).then(function (el) {
													return el === true;
													});
													}).then(function () {

														expect(playPage.myname.getText()).toBe("X: Kiddi2");
														expect(playPage.opponentname.getText()).toBe("O: Ragnar2");
														makeMove(playPage.x0y2, 'X');

														browser.sleep(2000);
														expect(playPage.winner).toBeDefined();
														expect(playPage.winner.getText()).toBe("Kiddi2 WINS!");
														makeMove(playPage.x2y2, '');

														browser.switchTo().window(joinerHandle).then(function () {
															browser.driver.wait(function () {
															return browser.driver.isElementPresent(by.css('#myBoard')).then(function (el) {
															return el === true;
															});
															}).then(function () {

																expect(playPage.myname.getText()).toBe("O: Ragnar2");
																expect(playPage.opponentname.getText()).toBe("X: Kiddi2");
																makeMove(playPage.x2y2, '');

																browser.switchTo().window(creatorHandle).then(function () {
																	browser.driver.wait(function () {
																	return browser.driver.isElementPresent(by.css('#myBoard')).then(function (el) {
																	return el === true;
																	});
																	}).then(function () {
																		done();
																	});
																});
															});
														});
													});
												});
											});
										});
									});
								});
							});
						});
					});
				});
			});
		});
	});
});
