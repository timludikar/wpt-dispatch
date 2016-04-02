import WebPageTest from 'webpagetest';
import {wpt} from '../../config.js';

const wptPublic = new WebPageTest('www.webpagetest.org', wpt.apiKey);

const wptRoutes = [{
	method: 'GET',
	path: '/api/webpagetest/',
	handler: (req, res) => {
		wptPublic.getLocations((err, data) => {
			res(data);
		});
	}
}];

export default wptRoutes;