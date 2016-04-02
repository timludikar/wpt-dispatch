import WebPageTest from 'webpagetest';

const wptPublic = new WebPageTest('www.webpagetest.org', 'API-KEY');

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