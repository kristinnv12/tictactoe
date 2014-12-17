'use strict';

var JoinGamePage = function() {
	this.container = element(by.css('.joinContainer'));
	this.userName = this.container.element(by.css('#userName'));
	this.joinGameButton = this.container.element(by.css('#joinGame'));
	this.sameName = this.container.element(by.css('#sameName'));
};
module.exports = new JoinGamePage();