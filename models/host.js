import Sequelize from 'sequelize';
import fs from 'fs';

const file = "./db/wpt-dispatch.db";
let exists = fs.existsSync(file);

if(!exists) {
	console.log("Creating DB file.");
	fs.openSync(file, "w");
}

const sequelize = new Sequelize('dispatch', 'admin', 'admin', {
	host: 'localhost',
	dialect: 'sqlite',
	storage: file
});

const Host = sequelize.define('host', {
	label: {
		type: Sequelize.STRING
	},
	url: {
		type: Sequelize.STRING
	}
});

export default Host;