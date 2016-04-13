import { 
	graphql, 
	GraphQLSchema, 
	GraphQLObjectType, 
	GraphQLString, 
	GraphQLInt,
	GraphQLList
} from 'graphql';

import WebPageTest from 'webpagetest';
import {wpt} from '../config.js';
import { groupBy } from 'lodash';

const wptPublic = new WebPageTest('www.webpagetest.org', wpt.apiKey);

const Location = new GraphQLObjectType({
	name: "Location",
	fields: {
		id: { type: GraphQLString },
		Label: { type: GraphQLString },
		location: { type: GraphQLString},
		Browser: { 
			type: GraphQLString
		}
	}
});

const Query = new GraphQLObjectType({
	name: 'LocationSchema',
	description: 'Root of the Location Schema',
	fields: () => ({
		locations: {
			type: new GraphQLList(Location),
			resolve: () => {
				return new Promise(function (resolve, reject) {
					wptPublic.getLocations((err, data) => {
						resolve(data.response.data.location);
					});
				});
			}
		}
	})
});

const Mutation = new GraphQLObjectType({
	name: 'LocationMutation',
	description: 'Mutation for location',
	fields: () => ({
		createLocation: {
			type: Location,
			args: {
				id: {
					type: GraphQLString
				}
			},
			resolve: (source, args) => {
				let location = Object.assign({}, args);
				data.push(location);
				return location;
			}
		}
	})
});

export const locationSchema = new GraphQLSchema({
	query: Query,
	mutation: Mutation
});