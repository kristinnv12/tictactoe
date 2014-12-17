'use strict'

console.debug = console.log;

describe('e2e testing: drawGame', function(){

	var createPage;
	var joinPage;

	beforeEach(function(){
		browser.get('/');
		createPage = require('./createGame.po');
		joinPage = require('./joinGame.po');
	});

	function makeMove(cell, expected){
		browser.sleep(500);
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

	it('should draw a game', function(done){
		
		//console.log(JSON.stringify(createPage.gameName));
		createPage.gameName.sendKeys("MyGame");
		createPage.userName.sendKeys("Kiddi");
		createPage.createGameButton.click();

		var playPage = require('./playGame.po');


		//cant make move when game not full
		makeMove(playPage.x1y1, '');

		playPage.joinLink.getAttribute('href').then(function (joinHref) {
			browser.getAllWindowHandles().then(function (handles) {

				var creatorHandle = handles[0];
				var joinerHandle = 'join-window';

				browser.executeScript('window.open("' + joinHref + '", ' + '"' + joinerHandle + '"' + ')');

				console.log(creatorHandle);
				browser.switchTo().window(joinerHandle);
				joinPage.userName.sendKeys("Ragnar");
				joinPage.joinGameButton.click();
				makeMove(playPage.x1y1, '');

				browser.switchTo().window(creatorHandle).then(function () {
					browser.driver.wait(function () {
					return browser.driver.isElementPresent(by.css('#myBoard')).then(function (el) {
					return el === true;
					});
					}).then(function () {

						expect(playPage.myname.getText()).toBe("X: Kiddi");
						makeMove(playPage.x0y0, 'X');

						
						browser.switchTo().window(joinerHandle).then(function () {
							browser.driver.wait(function () {
							return browser.driver.isElementPresent(by.css('#myBoard')).then(function (el) {
							return el === true;
							});
							}).then(function () {

								expect(playPage.myname.getText()).toBe("O: Ragnar");
								expect(playPage.opponentname.getText()).toBe("X: Kiddi");
								makeMove(playPage.x1y0, 'O');

								browser.switchTo().window(creatorHandle).then(function () {
									browser.driver.wait(function () {
									return browser.driver.isElementPresent(by.css('#myBoard')).then(function (el) {
									return el === true;
									});
									}).then(function () {

										expect(playPage.myname.getText()).toBe("X: Kiddi");
										expect(playPage.opponentname.getText()).toBe("O: Ragnar");
										makeMove(playPage.x0y1, 'X');

										browser.switchTo().window(joinerHandle).then(function () {
											browser.driver.wait(function () {
											return browser.driver.isElementPresent(by.css('#myBoard')).then(function (el) {
											return el === true;
											});
											}).then(function () {

												expect(playPage.myname.getText()).toBe("O: Ragnar");
												expect(playPage.opponentname.getText()).toBe("X: Kiddi");
												makeMove(playPage.x1y1, 'O');

												browser.switchTo().window(creatorHandle).then(function () {
													browser.driver.wait(function () {
													return browser.driver.isElementPresent(by.css('#myBoard')).then(function (el) {
													return el === true;
													});
													}).then(function () {

														expect(playPage.myname.getText()).toBe("X: Kiddi");
														expect(playPage.opponentname.getText()).toBe("O: Ragnar");
														makeMove(playPage.x2y0, 'X');

														browser.switchTo().window(joinerHandle).then(function () {
															browser.driver.wait(function () {
															return browser.driver.isElementPresent(by.css('#myBoard')).then(function (el) {
															return el === true;
															});
															}).then(function () {

																expect(playPage.myname.getText()).toBe("O: Ragnar");
																expect(playPage.opponentname.getText()).toBe("X: Kiddi");
																makeMove(playPage.x2y1, 'O');

																browser.switchTo().window(creatorHandle).then(function () {
																	browser.driver.wait(function () {
																	return browser.driver.isElementPresent(by.css('#myBoard')).then(function (el) {
																	return el === true;
																	});
																	}).then(function () {

																		expect(playPage.myname.getText()).toBe("X: Kiddi");
																		expect(playPage.opponentname.getText()).toBe("O: Ragnar");
																		makeMove(playPage.x2y2, 'X');

																		browser.switchTo().window(joinerHandle).then(function () {
																			browser.driver.wait(function () {
																			return browser.driver.isElementPresent(by.css('#myBoard')).then(function (el) {
																			return el === true;
																			});
																			}).then(function () {

																				expect(playPage.myname.getText()).toBe("O: Ragnar");
																				expect(playPage.opponentname.getText()).toBe("X: Kiddi");
																				
																				makeMove(playPage.x0y2, 'O');

																				browser.switchTo().window(creatorHandle).then(function () {
																					browser.driver.wait(function () {
																					return browser.driver.isElementPresent(by.css('#myBoard')).then(function (el) {
																					return el === true;
																					});
																					}).then(function () {

																						expect(playPage.myname.getText()).toBe("X: Kiddi");
																						expect(playPage.opponentname.getText()).toBe("O: Ragnar");
																						makeMove(playPage.x2y1, 'O');
																						makeMove(playPage.x1y2, 'X');


																						browser.sleep(500);
																						expect(playPage.draw).toBeDefined();
																						expect(playPage.draw.getText()).toBe("DRAW!");
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
			});
		});
	});
});