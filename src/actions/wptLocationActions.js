import Reflux from 'reflux';
import fetch from 'isomorphic-fetch';

const ItemActions = Reflux.createActions({
	'loadItems': {children: ['completed', 'failed']}
});

ItemActions.loadItems.listen(function(){
	let self = this;

	let data = new FormData();
	data.append("query", "{ locations { id, Label }}" );

	fetch('/graphql', {
		method: 'POST',
		body: data
	}).then(res => {
		return res.json();
	}).then(results => {
		self.completed(results.data.locations);
	});
});

export default ItemActions;