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

	it('should win a  game', function(){
		
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
														makeMove(playPage.x0y2, 'X');

														browser.sleep(500);
														expect(playPage.winner).toBeDefined();
														expect(playPage.winner.getText()).toBe("Kiddi WINS!");
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

/*
'use strict';
console.debug = console.log;
describe('Tictactoe game play', function() {
    var createPage;
    var joinPage;
    beforeEach(function() {
        browser.get('/');
        createPage = require('./createGame.po');
        joinPage = require('./joinGame.po');
    });

    function placeMove(cellElement, expected) {
        browser.sleep(1000);
        cellElement.click();
        expect(cellElement.getText()).toBe(expected);
    }
    it('should play to win', function() {
        createPage.gameName.sendKeys("Cheese");
        createPage.userName.sendKeys("Jerry");
        createPage.createGameButton.click();
        var tictactoe = require('./playGame.po');
        expect(tictactoe.board).toBeDefined();
        placeMove(tictactoe.x0y0, '');
        tictactoe.joinLink.getAttribute('href').then(function(joinHref) {
            // handle of first window
            browser.getAllWindowHandles().then(function(handles) {
                var creatorHandle = handles[0];
                var joinerHandle = 'second-window';
                browser.executeScript('window.open("' + joinHref + '", ' + '"' + joinerHandle + '"' + ')');
                // switch to new window
                browser.switchTo().window(joinerHandle);
                joinPage.userName.sendKeys("Tom");
                joinPage.joinGameButton.click();
                browser.driver.wait(function() {
                    return browser.driver.isElementPresent(by.css('#myBoard')).then(function(el) {
                        return el === true;
                    });
                }).then(function() {
                    tictactoe.x1y1.click();
                    expect(tictactoe.x1y1.getText()).toBe('');
                    expect(tictactoe.myname.getText()).toBe("O: Tom");
                    browser.switchTo().window(creatorHandle).then(function() {
                        browser.driver.wait(function() {
                            return browser.driver.isElementPresent(by.css('#myBoard')).then(function(el) {
                                return el === true;
                            });
                        }).then(function() {
                            expect(tictactoe.myname.getText()).toBe("X: Jerry");
                    		tictactoe.x1y0.click();
                    		expect(tictactoe.x1y0.getText()).toBe('X');
                            browser.switchTo().window(joinerHandle).then(function() {
                                browser.driver.wait(function() {
                                    return browser.driver.isElementPresent(by.css('#myBoard')).then(function(el) {
                                        return el === true;
                                    });
                                }).then(function() {
                                    expect(tictactoe.myname.getText()).toBe("O: Tom");
                                    placeMove(tictactoe.x1y2, 'O');
                                    browser.switchTo().window(creatorHandle).then(function() {
                                        browser.driver.wait(function() {
                                            return browser.driver.isElementPresent(by.css('#myBoard')).then(function(el) {
                                                return el === true;
                                            });
                                        }).then(function() {
                                            expect(tictactoe.myname.getText()).toBe("X: Jerry");
                                            placeMove(tictactoe.x2y0, 'X');
                                            browser.sleep(500);
                                            expect(tictactoe.winner).toBeDefined();
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
});*/