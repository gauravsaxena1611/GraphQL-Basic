import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `

type Query {
  getProduct(_id: ID!): Product
  allProducts: [Product]
}

type Product {
  _id: ID!
  title: String!
  qty: Int
}

type Mutation {
  createProduct(input: ProductInput): Product
  updateProduct(_id: ID!, input: ProductInput): Product
  deleteProduct(_id: ID!) : Product
}

input ProductInput {
  title: String!
  qty: Int
}

`;

const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});

export default schema;
