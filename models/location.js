import { 
	graphql, 
	GraphQLSchema, 
	GraphQLObjectType, 
	GraphQLString, 
	GraphQLList
} from 'graphql';

let data = [
	{ 
		id: "SanJose_IE9",
		label: "San Jose, CA USA (IE 9,Chrome,Firefox)",
		location: "SanJose_IE9",
		browser: "IE 9"
	},
	{ 
		id: "SanJose_IE9",
		label: "San Jose, CA USA (IE 9,Chrome,Firefox)",
		location: "SanJose_IE9"
	}
];

const Location = new GraphQLObjectType({
	name: "Location",
	fields: {
		id: { type: GraphQLString },
		label: { type: GraphQLString },
		location: { type: GraphQLString},
		browser: { 
			type: GraphQLString,
			resolve: (location) => {
				return location.browser || "Not defined";
			}
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
				return data;
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