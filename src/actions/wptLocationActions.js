import Reflux from 'reflux';
import fetch from 'isomorphic-fetch';

const ItemActions = Reflux.createActions({
	'loadItems': {children: ['completed', 'failed']}
});

ItemActions.loadItems.listen(function(){
	let self = this;
	fetch('/graphql', {
		method: 'POST',
		body: '{ locations { id, Label, location }}'
	}).then(res => {
		return res.json();
	}).then(results => {
		self.completed(results.data.locations);
	});
});

export default ItemActions;