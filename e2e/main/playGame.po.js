'use strict';

var _ = require('lodash');

var PlayGamePage = function() {

	this.container = element(by.css('.playContainer'));

	this.board = this.container.element(by.css('#myBoard'));
	this.joinLink = this.container.element(by.css('#joinLink'));
	this.winner = this.container.element(by.css('.winner'));
	this.opponentname = this.container.element(by.css('#opponentname'));
	this.myname = this.container.element(by.css('#myname'));
	this.draw = this.container.element(by.css('.draw'));

	this.x0y0 = element(by.css('.x0y0'));
	this.x0y1 = element(by.css('.x0y1'));
	this.x0y2 = element(by.css('.x0y2'));
	this.x1y0 = element(by.css('.x1y0'));
	this.x1y1 = element(by.css('.x1y1'));
	this.x1y2 = element(by.css('.x1y2'));
	this.x2y0 = element(by.css('.x2y0'));
	this.x2y1 = element(by.css('.x2y1'));
	this.x2y2 = element(by.css('.x2y2'));
};
module.exports = new PlayGamePage();

