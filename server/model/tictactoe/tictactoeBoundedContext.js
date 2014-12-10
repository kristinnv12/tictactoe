var _ = require('lodash')

module.exports = function(eventStore, commandHandler){
	return{
		handleCommand : function(cmd)
		{
			var eventStream = eventStore.loadEvents(cmd.id);
			var events = commandHandler(eventStream).executeCommand(cmd);
			eventStore.storeEvents(cmd.id, events);
			console.log(eventStore.loadEvents(cmd.id));
			return events;
		}
	}
}