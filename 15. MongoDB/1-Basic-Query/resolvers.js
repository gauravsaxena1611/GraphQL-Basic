import Product from './models/product';

export const resolvers = {
	Query: {
		async getProduct(root, { _id }) {
			return await Product.findById(_id);
		},
		async allProducts() {
			return await Product.find();
		}
	},
	
	Mutation: {
		/** add new mutation in resolvers.js. 
	 	*  The main purpose of this mutation is to add a new record in MongoDB. */
		async createProduct(root, { input }) {
			return await Product.create(input);
		},
		/** new resolver for updateProduct */
		async updateProduct(root, { 
			_id, 
			input 
		}) {
			return await Product.findOneAndUpdate({
					_id
				}, input, {
					new: true
				});
		},
		/** new resolver for deleteProduct */
		async deleteProduct(root, {
            _id
        }) {
            return await Product.findOneAndRemove({
                _id
            });
        }
	}
};
