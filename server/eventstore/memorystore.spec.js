var memorystore = require('./memorystore');
var should = require('should');

describe('---------Event Store Testing--------', function(){
	it('should return empty if id doesnt excist', function(){

		var eventStore = memorystore();

		var results = eventStore.loadEvents("1337");

		should(results).be.instanceof(Array);
		should(results.length).be.exactly(0);
	});

	it('should return events in store', function(){

		var eventStore = memorystore();

		eventStore.storeEvents('1337', 
		[
			{
				id: "1",
				command: "GameCreated",
				user: {
					userName: "Kiddi"
				},
				name: "MyGame",
				timeStamp: "2014-12-02-T18:23:55"
			}
		]);

		var results = eventStore.loadEvents("1337");

		should(results).eql(
		[
			{
				id: "1",
				command: "GameCreated",
				user: {
					userName: "Kiddi"
				},
				name: "MyGame",
				timeStamp: "2014-12-02-T18:23:55"
			}
		]);
	});

	it('should append event to excisting events', function(){

		var eventStore = memorystore();

		eventStore.storeEvents('1337', 
		[
			{
				id: "1",
				command: "GameCreated",
				user: {
					userName: "Kiddi"
				},
				name: "MyGame",
				timeStamp: "2014-12-02-T18:23:55"
			}
		]);

		eventStore.storeEvents('1337', 
		[
			{
				id: "2",
				event: "GameCreated",
				user: {
					userName: "Ragnar"
				},
				name: "HisGame",
				timeStamp: "2014-12-02-T18:23:55"
			}
		]);

		var results = eventStore.loadEvents("1337");

		should(results).eql(
		[
			{
				id: "1",
				command: "GameCreated",
				user: {
					userName: "Kiddi"
				},
				name: "MyGame",
				timeStamp: "2014-12-02-T18:23:55"
			},
			{
				id: "2",
				event: "GameCreated",
				user: {
					userName: "Ragnar"
				},
				name: "HisGame",
				timeStamp: "2014-12-02-T18:23:55"
			}
		]);
	});
});