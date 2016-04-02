import Reflux from 'reflux';
import fetch from 'isomorphic-fetch';

const ItemActions = Reflux.createActions({
	'loadItems': {children: ['completed', 'failed']}
});

ItemActions.loadItems.listen(function(){
	let self = this;
	fetch('/api/webpagetest/').then(res => {
		return res.json();
	}).then(results => {
		self.completed(results.response.data);
	});
});

export default ItemActions;