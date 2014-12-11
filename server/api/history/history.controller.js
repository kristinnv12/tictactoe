'use strict';
var _ = require('lodash');
var app = require('../../app');

exports.index = function(request, response ) {

if(!app.eventStore){
	app.eventStore = require('../../eventstore/memorystore')();
}
	response.json(app.eventStore.loadEvents(request.params.id));
};