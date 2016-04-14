import {
	graphql,
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLBoolean,
	GraphQLNonNull,
	GraphQLID
} from 'graphql';

import Host from '../models/host';

const HostObject = new GraphQLObjectType({
	name: "Host",
	description: "Available hosts for Webpagetest.",
	fields: {
		id: { type: new GraphQLNonNull(GraphQLString) },
		label: { type: GraphQLString },
		url: { type: GraphQLString}
	}
});

const Query = new GraphQLObjectType({
	name: 'HostSchema',
	description: 'Root of the Location Schema',
	fields: () => ({
		locations: {
			args: {
				label: { type: GraphQLString }
			},
			type: new GraphQLList(HostObject),
			resolve: (source, args) => {
				if(args.label){
					return Host.findAll({
						where: {
							label: args.label
						}
					}).then(local => {
						return local;
					});
				} else {
					return Host.all().then(local => {
						return local;
					});
				}
			}
		}
	})
});

const Mutation = new GraphQLObjectType({
	name: 'LocationMutation',
	description: 'Mutation for location',
	fields: () => ({
		createHost: {
			type: HostObject,
			args: {
				label: { type: GraphQLString },
				url: { type: GraphQLString }
			},
			resolve: (source, args) => {
				return Host.sync().then(() => {
					return Host.create({
						label: args.label,
						url: args.url
					});
				});
			}
		},
		removeHost: {
			type: GraphQLBoolean,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) }
			},
			resolve: (source, args) => {
				return Host.sync().then(() => {
					return Host.destroy({
						where: {
							id: args.id
						}
					});
				});
			}
		}
	})
});

export const configSchema = new GraphQLSchema({
	query: Query,
	mutation: Mutation
});
