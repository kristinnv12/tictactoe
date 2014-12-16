'use strict';

var CreateGamePage = function() {
	this.container = element(by.css('.createContainer'));
	this.gameName = this.container.element(by.css('#gameName'));
	this.userName = this.container.element(by.css('#userName'));
	this.createGameButton = this.container.element(by.css('#createGame'));
	this.bla = 'fnkjsdn';
};
module.exports = new CreateGamePage();